import { TagItem, TagItemFile } from '../model/TagModel';
import axios from './instanceAxios';

const baseUrl = 'admin/tag';

export const getTags = async () => {
  const response = await axios.get(baseUrl);
  return response.data?.result as TagItem[];
};

export const getTagDetail = async (tagId: string) => {
  const response = await axios.get(`${baseUrl}/${tagId}`);
  return response.data?.result;
};

export const createTag = async (tag: TagItem) => {
  const response = await axios.post(`${baseUrl}/create`, tag);
  return response.data;
};

export const createTagByFile = async (data: TagItemFile) => {
  const response = await axios.post(`${baseUrl}/create/excel-batch`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}


export const updateTag = async (tag: TagItem) => {
    const response = await axios.put(`${baseUrl}/${tag.tag_id}`, { ...tag });
    return response.data;
  
};

export const deleteTag = async (tagId: string) => {
  const response = await axios.delete(`${baseUrl}/${tagId}`);
  return response.data;
};
