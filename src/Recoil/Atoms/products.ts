import { atom } from "recoil";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

interface EnrollData {
    name: string;
    description: string;
    price: string;
    image: File | null;
  }

// 전체 조회
export const getAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get("http://211.238.138.197:8080/products");
    return response.data;
};

// 상세 페이지 조회
export const getProductById = async (id: number): Promise<Product> => {
    const response = await axios.get(`http://211.238.138.197:8080/products/${id}`);
    return response.data;
};

// 검색 기능
export const searchProductsByName = async (searchName: string): Promise<{ searchResults: Product[]; notFound: boolean }> => {
    try {
        const response = await axios.get(`http://211.238.138.197:8080/products/search?searchName=${searchName}`);
    
        if (response.status === 200) {
          return { searchResults: response.data, notFound: false };
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error(error);
        return { searchResults: [], notFound: true };
      }
};

// 이미지 변경 기능
export const updateProductImage = async (id: number, imageUrl: string): Promise<Product> => {
    const response = await axios.patch(`http://211.238.138.197:8080/products/${id}/image`, { imageUrl });
    return response.data;
};

// // 상품등록
// export const enroll = async (formData: {
//     name: string;
//     description: string;
//     price: string;
//     file: File | null;
//   }) => {
//     const response = await axios.post("http://211.238.138.197:8080/products/enroll", formData,{
//         headers: {
//             "Content-Type": "multipart/form-data"
//           }
//     });
//     const { name, description, price, imageUrl} = response.data;
  
//     return { name, description, price, imageUrl };
// };

export const enroll = async (data: EnrollData) => {
    const { name, description, price, image } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    
    // 이미지가 있는 경우에만 FormData에 추가
    if (image) {
      formData.append("file", image);
    }
  
    const response = await axios.post("http://211.238.138.197:8080/products/enroll", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const {name: resName, description: resDescription, price: resPrice, imageUrl} = response.data;
  
  return { name: resName, description: resDescription, price: resPrice, imageUrl };
};
  
  