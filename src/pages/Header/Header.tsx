import * as React from "react";
import '../../assets/scss/header.css';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState, isLoggedInState, logout } from "../../Recoil/Atoms/auth";

interface Props {
    textColor: string;
}

const Acolor = styled(Link)<Props>`
  color: ${(props) => props.textColor || "white"};
`;

const Header: React.FC<Props> = ({ textColor }) => {
    const userInfo = useRecoilValue(userState);
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const resetUser = useResetRecoilState(userState);
    const navigate = useNavigate();

    const logoutClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await logout();
        resetUser();
        setIsLoggedIn(false);
        navigate("/");
    };
  return (
    <div className="Header">
      <div className="layout">
        <Acolor to="/products" textColor={textColor} className="productList">상품목록</Acolor>
        {!isLoggedIn && (
          <Acolor to="/login" textColor={textColor}>
            로그인
          </Acolor>
        )}
        <Acolor to="/services" textColor={textColor}>서비스</Acolor>
        {isLoggedIn && (
          <>
            <span>{userInfo.username}</span>
            <Acolor to="/" textColor={textColor} onClick={logoutClick}>
              로그아웃
            </Acolor>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;