import { axiosInstance } from ".";

export const getSellOrders = async () => {
  const response = await axiosInstance.get("/sellorders");

  return response.data;
};

export const getSellOrder = async (id: string) => {
  const response = await axiosInstance.get(`/sellorders/${id}`);

  return response.data;
}
