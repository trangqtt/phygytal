import { axiosInstance } from ".";

export const getCollections = async () => {
  const response = await axiosInstance.get("collections");

  return response.data;
};

export const getCollection = async (id: string) => {
  const response = await axiosInstance.get(`collections/${id}`);

  return response.data;
}
