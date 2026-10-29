import axios from "../utils/instanceAxios";

export const getCompetitionItems = async (competitionSlug = "da-non-nuoc") => {
  const response = await axios.get(`competition/${competitionSlug}`);
  return response?.data?.result?.gallery_items;
};

