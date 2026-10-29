import { requestFormData, requestJsonData } from '.';
import { Collection } from '../model/CollectionModel';
import { ProductItem } from '../model/ProductModel';
import axios from './instanceAxios';

const baseUrl = `admin/product_collection`;

export const getCollections = async () => {
  const response = await axios.get(baseUrl);
  return response.data as Collection[];
};

export const getCollectionDetail = async (collectionId: string) => {
  const response = await axios.get(`${baseUrl}/${collectionId}`);
  return response.data;
};

export const createCollection = async (collection: Collection) => {
  const rs = await axios.post(baseUrl, {
    ...collection,
  });

  return rs.data;
};

export const updateCollection = async (collection: Collection) => {
  const rs = await axios.put(`${baseUrl}/${collection.id}`, {
    ...collection,
  });

  return rs.data;
};

export const deleteCollection = async (collectionId: string) => {
  const rs = await axios.delete(`${baseUrl}/${collectionId}`);

  return rs;
};
