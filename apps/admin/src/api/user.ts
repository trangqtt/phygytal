import { UserRole } from '../routes';
import axios from './instanceAxios';

const baseUrl = 'admin/user';

export const getUsers = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data?.result;
};

export const getUser = async (userId: string) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data?.result;
};

export const updateUserRole = async (userId: string, role: UserRole) => {
  const response = await axios.put(`${baseUrl}/role`, {
    new_role: role,
    user_id: userId,
  });
  return response.data?.result;
};

export const signUp = async (accessToken: string) => {
  const response = await axios.post(`signup`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// export const updateUserOrg = async (userId: string, orgTagName: string) => {
//   const response = await axios.get(`${baseUrl}/${id}`);
//   return response.data?.result?.org_list;
// };
