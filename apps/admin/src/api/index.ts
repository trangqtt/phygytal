import { FormDataObject } from '../model/general';
import axios from './instanceAxios';

export const requestFormData = async (
  data: FormDataObject,
  url: string,
  method: 'post' | 'get' | 'put' | 'delete'
) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await axios({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const requestJsonData = async (
  data: FormDataObject,
  url: string,
  method: 'post' | 'get' | 'put' | 'delete'
) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await axios({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
