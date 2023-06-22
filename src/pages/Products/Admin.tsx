import React, { useState } from "react";
import { enroll } from "../../Recoil/Atoms/products"; // enroll 함수가 포함된 파일로 경로를 변경해주세요.

interface FormDataState {
    name: string;
    description: string;
    price: string;
    image: File | null;
  }

const Admin = () => {
    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        description: '',
        price: '',
        image: null,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === "image") {
      if (files && files.length > 0) {
        console.log(files[0]);
        setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: e.target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const { name, description, price, imageUrl } = await enroll(formData);
      console.log("Enrolled product:", { name, description, price, imageUrl });
      alert("상품이 등록되었습니다.");
    } catch (error) {
      console.error("Error while enrolling product:", error);
      alert("상품 등록 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <h1>관리자 페이지</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label htmlFor="name">이름:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="description">설명:</label>
                <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="price">가격:</label>
                <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="image">이미지:</label>
                <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit">상품 등록하기</button>
        </form>
    </div>
  );
};

export default Admin;