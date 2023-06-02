import * as React from "react";
import Header from "../Header/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { userState, isLoggedInState, login } from "../../Recoil/Atoms/auth";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const setUser = useSetRecoilState(userState);
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const loggedInUser = await login(formData);
          setUser(loggedInUser);
          setIsLoggedIn(true);
          navigate("/")
        } catch (error) {
          console.error(error); // 이 부분은 에러처리를 원하는 방식으로 변경하실 수 있습니다.
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/SignUp")
    };

  return (
    <div className="Login">
      <Header textColor={'black'}></Header>
      <div className="memberBox">
        <div className="loginBox">
            <h3>로그인을 해주세요</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                >
                </input>
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                >
                </input>
                <button type="submit">login</button>
            </form>
        </div>
        <div className="signupBox">
            <h3>회원가입을 해주세요</h3>
            <a onClick={handleClick}>회원가입 페이지로</a>
        </div>
      </div>
    </div>
  );
};

export default Login;