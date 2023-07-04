import * as React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/LogIn/Login";
import Products from "../pages/Products/Products";
import ProductDetail from '../pages/Products/ProductDetail';
import Admin from "../pages/Products/Admin";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
        {/*  추가적인 라우트를 이곳에 작성해주세요  */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

