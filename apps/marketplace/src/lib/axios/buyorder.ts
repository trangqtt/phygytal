import { axiosInstance } from ".";
import { BuyOrderPayload } from "../../models/order";

export const createBuyOrder = async (payload: BuyOrderPayload) => {
  const response = await axiosInstance.post(`user/buyorders`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};