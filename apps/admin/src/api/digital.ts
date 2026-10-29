import { DigitalAsset } from '../model/DigitalModel';
import axios from './instanceAxios';

const baseUrl = 'admin/digital-asset';

export const getDigitalAssets = async (org_tag_name?: string) => {
  const url = baseUrl + (org_tag_name ? `?org_tag_name=${org_tag_name}` : '');
  const response = await axios.get(url);
  return response.data?.digital_assets as DigitalAsset[];
};
