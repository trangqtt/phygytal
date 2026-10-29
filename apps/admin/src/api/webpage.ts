import { PageModel } from '../model/PageModel';
import axios from './instanceAxios';

const webpageBaseUrl = `admin/web-page`;

export const getWebpage = async (id: string) => {
  try {
    const response = await axios.get(`web-page/${id}`);

    return response.data?.result;
  } catch (err) {
    console.error('Error when get page');
  }
};

export const deleteWebpage = async (id: string) => {
  try {
    const response = await axios.delete(`${webpageBaseUrl}/${id}`);

    return response.data?.result;
  } catch (err) {
    console.error('Error when delete page');
  }
};

export const getWebpages = async () => {
  const response = await axios.get(`${webpageBaseUrl}`);
  return response.data?.result;
};

export const createWebpage = async ({ name, type, values, values_model,translations }: PageModel) => {
  try {
    const response = await axios.post(`${webpageBaseUrl}`, {
      name,
      type,
      values,
      values_model,
      translations
    });

    return response.data?.result;
  } catch (err) {
    console.error('Error when create page');
  }
};

export const updateWebpage = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${webpageBaseUrl}/${id}`, data);

    return response.data?.result;
  } catch (err) {
    console.error('Error when update page');
  }
};
