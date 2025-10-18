import { API } from "../../../Axios";

export const ProductService = {
  AddProductSimple: async (data) => {
    try {
      const res = await API.post("/product", data, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  GetAllProduct: async (query) => {
    try {
      const res = await API.get(
        `/product?${query}`,
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
  GetProductviaID: async (id) => {
    try {
      const res = await API.get(`/product/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  DeleteProduct: async (id) => {
    try {
      const res = await API.delete(`/product/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  UpdateProduct: async (id, data) => {
    try {
      const res = await API.put(`/product/${id}`, data, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
