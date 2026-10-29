import { StoryResponse } from "@/models/story";
import axios from "../utils/instanceAxios";

const productItemBaseUrl = "product-item";

export const getProductStoryData = async (
  chipId: string,
  sessionId?: string
) => {
  const response = await axios.get(
    `/${productItemBaseUrl}/story?tag_id=${chipId}${
      sessionId ? `&sessionId=${sessionId}` : ""
    }`
  );
  return response?.data?.result as StoryResponse;
};

export const claimProductItem = async (productItemId: string) => {
  const response = await axios.put(
    `${productItemBaseUrl}/${productItemId}/claim`
  );
  return response?.data?.result;
};

export const likeProductItem = async (productItemId: string) => {
  const response = await axios.post(`/product-item/${productItemId}/like`);
  return response?.data?.result;
};
