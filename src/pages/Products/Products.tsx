import * as React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getAllProducts, getProductById, searchProductsByName, updateProductImage } from "../../Recoil/Atoms/products";
import '../../assets/scss/products.css';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 전체 상품 조회
  const fetchProducts = async () => {
    const productList = await getAllProducts();
    setProducts(productList);
  };

  // 상품 검색
  const handleSearch = async () => {
    if (search.trim()) {
        const { searchResults, notFound } = await searchProductsByName(search);
      if (notFound) {
        // 상품 정보가 없음을 사용자에게 알림
        alert("검색 상품이 없습니다.");
      } else {
        // 검색된 상품 목록을 처리
        setProducts(searchResults);
      }
    } else {
      fetchProducts();
    }
  };

  // 상세 페이지 조회
  const handleProductDetail = (id: number) => {
    navigate(`/products/${id}`);
  };

  // 이미지 변경
  const handleChangeImage = async (id: number, imageUrl: string) => {
    const updatedProduct = await updateProductImage(id, imageUrl);
    setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
  };

  // 최초 마운트 시 전체 상품 조회
  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Header textColor={'#4caf50'}></Header>
      <div className="searchBox">
        <input
          type="text"
          value={search}
          placeholder="Search products by name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="ProductList">
      {products.map((product) => (
        <div className="product" key={product.id} onClick={() => handleProductDetail(product.id)}>
          <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.name} style={{ width: '150px', height: '150px' }} ></img>
          <div className="namepriceBox">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Products;
