import axios from "../utils/instanceAxios";

export const getPageDetail = async (pageId: string) => {
  const response = await axios.get(`/organization/web-page?pageId=${pageId}`);
  return response?.data?.result;
};

