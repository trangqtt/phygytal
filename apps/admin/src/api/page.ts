import axios from './instanceAxios';

const adminBackendUrl = import.meta.env.VITE_ADMIN_BACKEND_URL;

const pageBaseUrl = `organization/web-page`

export const createPage = async (pageData: any) => {
  // try {
  //   const response = await axios.post(
  //     `${pageBaseUrl}/new-product-page`,
  //     pageData
  //   );
  //   return response;
  // } catch (error) {
  //   console.error('Error when mapping chip with story');
  // }
};

export const updatePage = async (pageData: any) => {
  try {
    const response = await axios.put(
      `${pageBaseUrl}/update`,
      pageData
    );
    return response;
  } catch (error) {
    console.error('Error when mapping chip with story');
  }
};

export const getListPage = async () => {
  try {
    const response = await axios.get(`${pageBaseUrl}/all`);
    return response.data?.result;
  } catch (error) {
    console.error('Error when mapping chip with story');
  }
};

export const getListPageByProduct = async (productId: string) => {
  try {
    const response = await axios.get(`${pageBaseUrl}/all`);
    return response.data?.result;
  } catch (error) {
    console.error('Error when mapping chip with story');
  }
};

export const getPageDetail = async (id?: string) => {
  try {
    const response = await axios.get(
      `${pageBaseUrl}?pageId=${id}`
    );
    return response.data?.result;
  } catch (error) {
    console.error('Error when mapping chip with story');
  }
};


