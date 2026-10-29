import axios from "../utils/instanceAxios";

const webpageBaseUrl = "web-page";

export const getPageDetail = async (pageId?: string) => {
  const response = await axios.get(`${webpageBaseUrl}/${pageId}`);
  return response?.data?.result;
};
