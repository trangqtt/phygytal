import { requestFormData } from '.';

export const uploadImages = async (files: any) => {
  try {
    const response = await requestFormData({ files }, `upload`, "post");
    return response?.result;
  } catch (error) {
    console.error('Error when upload files');
  }
};
