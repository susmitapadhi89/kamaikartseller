import { API } from "../../../Axios";

export const OrderDetailService = {
  GetOrderDetails: async (query) => {
    try {
      const res = await API.get(
        `/seller/getOrders?${query}`,
        {},
        {
          withCredentials: true,
        }
      );

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

  ChangedOrderStatus: async (orderId, status) => {
    try {
      const res = await API.put(
        "/seller/updateOrderStatus",
        { orderId, status }, // ✅ correct JSON body
        { withCredentials: true }
      );

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
