import { requestFormData } from '.';
import axios from './instanceAxios';

const mappingUrl = 'admin/mapping';

export const mappingTagWithTheme = async (
  tag_id: string,
  product_item_id: string,
  theme_id: string,
  external_url: string,
  claimable = false,
  org_id: string
) => {
  try {
    const response = await requestFormData(
      { tag_id, product_item_id, claimable, theme_id, external_url, org_id },
      `${mappingUrl}/update`,
      'put'
    );
    return response;
  } catch (error) {
    console.error('Error when mapping chip with story');
  }
};

export const updateMapping = async (tagId: string, update_mapping_request: any) => {
  const response = await axios.put(`${mappingUrl}/${tagId}`, update_mapping_request);
  return response;
};

export const unmap = async (tagId: string, productItemId: string) => {
  const response = await axios({
    method: 'delete',
    url: `${mappingUrl}/${tagId}`,
    data: {
      product_item_id: productItemId,
    },
  });
  return response;
};

export const getMappingData = async (organization_tag_name = '') => {
  try {
    const url = organization_tag_name
      ? `${mappingUrl}?org_tag_name=${organization_tag_name}`
      : mappingUrl;
    const response = await axios.get(url);

    return response.data?.result;
  } catch (error) {
    console.error('Error when mapping chip with story');
  }
};

export const getMappingByProductId = async (product_id: string) => {
  try {
    const response = await axios.get(`${mappingUrl}/product/${product_id}`);

    return response.data?.result;
  } catch (error) {
    console.error('Error when get mapping by product');
  }
};

export const toggleClaim = async (productItemId: string) => {
  try {
    const response = await axios.put(`product-item/${productItemId}/toggle-claimable`);

    return response.data?.result;
  } catch (error) {
    console.error('Error when get toggle cliaim by product');
  }
};
