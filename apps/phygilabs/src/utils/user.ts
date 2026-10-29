import { userInfoKey } from "@/constant";

export const getUserInfo = () => {
  const userInfo =
    typeof window !== "undefined" &&
    JSON.parse((localStorage as any).getItem(userInfoKey));
  return userInfo;
};

export const setUserInfo = (userInfo: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  }
};
