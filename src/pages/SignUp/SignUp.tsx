import * as React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { userState } from "../../Recoil/Atoms/user";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // API 호출하여 회원가입 로직 구현
    // 예시: signUp({ username, password })

    // API 호출 후 recoil 상태 업데이트
    setUser({ username });

    // 로그인 페이지로 이동
    navigate("/");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
