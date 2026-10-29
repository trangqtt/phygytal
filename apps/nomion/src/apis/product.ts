import axios from "../utils/instanceAxios";

export const getProductData = async (chipId: string) => {
  const response = await axios.get(`/productItem/get-story?chip-id=${chipId}`);
  return response?.data?.result;
};

export const claimProductItem = async (productItemId: string) => {
  const response = await axios.put(`/product-item/${productItemId}/claim`);
  return response?.data?.result;
};

export const likeProductItem = async (productItemId: string) => {
  const response = await axios.post(`/product-item/${productItemId}/like`);
  return response?.data?.result;
}
