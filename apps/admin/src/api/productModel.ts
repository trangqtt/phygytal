import { requestFormData, requestJsonData } from '.';
import { ProductModelEntity } from '../model/ProductModelEntity';
import axios from './instanceAxios';

const baseUrl = `admin/product-data-model`;

export const getProductModels = async () => {
  const response = await axios.get(baseUrl);
  return response.data?.result?.product_data_models as ProductModelEntity[];
};

export const getProductModelDetail = async (productModelId: string) => {
  const response = await axios.get(`${baseUrl}/${productModelId}`);
  return response.data?.result;
};

export const createProductModel = async (productModel: ProductModelEntity) => {
  const rs = await axios.post(baseUrl, {
    ...productModel,
  });

  return rs.data;
};

export const updateProductModel = async (productModel: ProductModelEntity) => {
  const rs = await axios.patch(`${baseUrl}/${productModel.id}`, {
    ...productModel,
  });

  return rs.data;
};

export const deleteProductModel= async (productModelId: string) => {
  const rs = await axios.delete(`${baseUrl}/${productModelId}`);

  return rs;
};
