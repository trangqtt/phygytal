/* eslint-disable no-undef */

import { userInfoKey } from "../constants";

export const setToLS = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key: string): any | null => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const removeFromLS = (key: string) => {
  window.localStorage.removeItem(key);
};

export const getUserInfo = (): any | null => {
  
  const userInfo = window.localStorage.getItem(userInfoKey);
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

export const setUserInfo = (userInfo: any) => {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
};
