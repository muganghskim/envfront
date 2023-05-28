import { atom } from "recoil";

export const userState = atom({
  key: "user", // 식별 가능한 고유 키
  default: { username: "" }, // 상태의 기본값
});
