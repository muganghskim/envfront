import * as React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/LogIn/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/*  추가적인 라우트를 이곳에 작성해주세요  */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

