import { requestFormData, requestJsonData } from '.';
import { ProductItem } from '../model/ProductModel';
import axios from './instanceAxios';

const productBaseAPIURL = `admin/product`;
const productItemBaseAPIURL = 'admin/product-item';

export const getAllProduct = async () => {
  try {
    const response = await axios.get(productBaseAPIURL);
    return response.data?.result;
  } catch (error) {
    console.error('Error when get products');
  }
};

export const getProductItems = async (productId: string) => {
  try {
    const response = await axios.get(`${productItemBaseAPIURL}?product_id=${productId}`);
    return response.data?.result?.product_items_list as ProductItem[];
  } catch (error) {
    console.error('Error when get products');
  }
};

export const getProductItemsByOrg = async (org_tag_name: string) => {
  try {
    const response = await axios.get(
      `${productItemBaseAPIURL}/organization/${org_tag_name}`
    );
    return response.data?.result?.product_items_list as ProductItem[];
  } catch (error) {
    console.error('Error when get products');
  }
};

export const createMultiProductItem = async (product_id: string, num_item: number) => {
  try {
    const data = {
      product_id,
      num_item,
    };
    const response = await requestFormData(
      data,
      `${productItemBaseAPIURL}/create-multiple`,
      'post'
    );
    return response?.result;
  } catch (error) {
    console.error('Error when create product items');
  }
};

export const getProductDetail = async (id: string) => {
  const response = await axios.get(`${productBaseAPIURL}/${id}`);
  return response.data?.result;
};

export const createProduct = async (data: any) => {
  try {
    const response = await requestJsonData(data, `${productBaseAPIURL}/create`, 'post');
    return response?.result;
  } catch (error) {
    console.error('Error when get products');
  }
};

export const updateProduct = async (data: any) => {
  const response = await requestJsonData(data, `${productBaseAPIURL}/${data.id}`, 'put');
  return response?.result;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${productBaseAPIURL}/${id}`);
  return response?.data;
};

export const mintNft = async (productItemId: string) => {
  try {
    const response = await axios.post(`${productItemBaseAPIURL}/${productItemId}/mint`);
    return response?.data?.result;
  } catch (error) {
    console.error('Error when mint product item');
  }
};

export const cloneProduct = async (productId: string) => {
  try {
    const response = await axios.post(`${productBaseAPIURL}/clone`, {
      product_id: productId,
    });
    return response?.data;
  } catch (error) {
    console.error('Error when clone product');
  }
};
