import { UpdateUser } from "@/models/UserData";
import axios from "../utils/instanceAxios";

const userBaseUrl = "user";

export const getUserData = async () => {
  const response = await axios.get(`${userBaseUrl}`);
  return response?.data?.result;
};

export const updateUser = async (data : UpdateUser) => {
  const response = await axios.put(`${userBaseUrl}`, data);
  return response?.data?.result;
}
