import * as React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { userState, isLoggedInState, signup } from "../../Recoil/Atoms/auth";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const registeredUser = await signup(formData);
      setUser(registeredUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error); // 이 부분은 에러처리를 원하는 방식으로 변경하실 수 있습니다.
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
