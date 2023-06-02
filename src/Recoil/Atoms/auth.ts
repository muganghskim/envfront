import { atom } from "recoil";
import axios from "axios";

interface User {
  username: string;
  email: string;
  token?: string;
}

export const userState = atom<User>({
  key: "user",
  default: { username: "", email: "" },
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: false,
});

export const login = async (formData: { email: string; password: string }) => {
  const response = await axios.post("http://211.238.138.197:8080/auth/login", formData);
  const { username, email, token } = response.data;

  localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장

  return { username, email, token };
};

export const signup = async (formData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("http://211.238.138.197:8080/auth/signup", formData);
  const { username, email, token } = response.data;

  localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장

  return { username, email, token };
};

export const logout = async () => {
    try {
      await axios.post("http://211.238.138.197:8080/auth/logout");
  
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error during logout:", error);
    }
};
