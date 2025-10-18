import { API } from "../../../Axios";

export const OrderDetailService = {
  GetOrderDetails: async () => {
    try {
      const res = await API.get("/seller/getOrders", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  GetOrderDetailsByID: async (orderId) => {
    try {
      const res = await API.get(`/seller/getOrders/${orderId}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
