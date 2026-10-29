import { requestJsonData } from '.';
import { AuthorModel } from '../model/AuthorModel';
import axios from './instanceAxios';

const authorBaseUrl = 'admin/author';

export const createAuth = async (data: AuthorModel) => {
  try {
    const response = requestJsonData(data, `${authorBaseUrl}`, 'post');

    return response;
  } catch (error) {
    console.error('Error when create auth');
  }
};

export const editAuth = async ({
  id,
  name,
  email,
  phone,
  avatar,
  artworks_count,
  experience_year,
  contact_name,
  translation,
  highlight_artworks,
}: AuthorModel) => {
  try {
    const response = requestJsonData(
      {
        name,
        email,
        phone,
        avatar,
        artworks_count,
        experience_year,
        contact_name,
        translation,
        highlight_artworks,
      },
      `${authorBaseUrl}/${id}`,
      'put'
    );

    return response;
  } catch (error) {
    console.error('Error when update auth');
  }
};

export const deleteAuth = async (id: string) => {
  try {
    const response = await axios.delete(`organization/${id}`);
    return response.data?.result;
  } catch (error) {
    console.error('Error when create auth');
  }
};

export const getAuthors = async () => {
  try {
    const response = await axios.get(authorBaseUrl);
    return response.data as AuthorModel[];
  } catch (error) {
    console.error('Error when get auth');
  }
};

export const getAuthDetail = async (id: string) => {
  try {
    const response = await axios.get(`author/${id}`);
    return response.data?.author;
  } catch (error) {
    console.error('Error when get auth');
  }
};
