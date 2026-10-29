import { requestFormData } from '.';
import { OrganizationModel } from '../model/OrganizationModel';
import { SelectInputOption } from '../model/general';
import axios from './instanceAxios';

const organizationBaseUrl = 'admin/organization';

export const transformOrgData = (orgsData: OrganizationModel[] | undefined) => {
  return (orgsData?.map((item) => {
    return {
      label: item.org_name,
      value: item.id,
    };
  }) || []) as SelectInputOption[];
};

export const createOrg = async (data: OrganizationModel) => {
  const response = await axios.post(`${organizationBaseUrl}/create`, data);
  return response;
};

export const editOrg = async (data: OrganizationModel) => {
  const response = await axios.put(`${organizationBaseUrl}/${data.id}`, data);
  return response;
};

export const updateOrg = async (data: OrganizationModel) => {
  const response = await axios.put(`${organizationBaseUrl}/${data.id}`, data);
  return response;
};

export const deleteOrg = async (id: string) => {
  const response = await axios.delete(`organization/${id}`);
  return response.data?.result;
};

export const getOrgs = async () => {
  const response = await axios.get(organizationBaseUrl);
  return response.data?.result as OrganizationModel[];
};

export const getOrgsForSelect = async () => {
  const response = await axios.get(organizationBaseUrl);
  return transformOrgData(response.data?.result as OrganizationModel[]);
};

export const getOrgDetail = async (id: string) => {
  const response = await axios.get(`${organizationBaseUrl}/${id}`);
  return response.data?.result;
};

export const getOrgDetailByTagname = async (tagName: string) => {
  const response = await axios.get(`${organizationBaseUrl}/${tagName}`);
  return response.data?.result;
};
