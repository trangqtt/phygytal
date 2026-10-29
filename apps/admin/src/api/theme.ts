import { ThemeModel } from '../model/ThemeModel';
import { SelectInputOption } from '../model/general';
import axios from './instanceAxios';

const themeBaseUrl = `admin/theme`;

export const transformThemeData = (themeData: ThemeModel[] | undefined) => {
  return (themeData?.map((item) => {
    return {
      label: item.name,
      value: item.theme_id,
    };
  }) || []) as SelectInputOption[];
};

export const getTheme = async (id: string) => {
  const response = await axios.get(`${themeBaseUrl}/${id}`);

  return response.data?.result;
};

export const getThemes = async () => {
  const response = await axios.get(`${themeBaseUrl}/all`);

  return response.data?.result?.theme_list;
};

export const createTheme = async (data: ThemeModel) => {
  const response = await axios.post(`${themeBaseUrl}/create`, data);

  return response.data?.result;
};

export const updateTheme = async (themeData: any) => {
  const response = await axios.put(`${themeBaseUrl}/${themeData.theme_id}`, themeData);

  return response.data?.result;
};

export const cloneTheme = async (id: string) => {
  const response = await axios.post(`${themeBaseUrl}/${id}/clone`, {
    theme_id: id,
  });

  return response.data?.result;
};

export const deleteTheme = async (id: string) => {
  const response = await axios.delete(`${themeBaseUrl}/${id}`);
  return response;
};