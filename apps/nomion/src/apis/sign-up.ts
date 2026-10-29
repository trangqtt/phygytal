import axios from "../utils/instanceAxios";

export const signUpAccount = async (accessToken: string) => {
  const data = {};
  const response = await axios.post(`/signup`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response?.data;
};
