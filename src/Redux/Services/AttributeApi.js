import { API } from "../../../Axios";

export const AttributeService = {
  GetAllAttribute: async () => {
    try {
      const res = await API.get("/attribute", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetAttributeBYID: async (id) => {
    try {
      const res = await API.get(`/attribute/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //editpage in varient value get
  AttributeValueRemove_nd_VarientvalueGet: async (data) => {
    try {
      const res = await API.post(`/product/removeAttributeInProduct`, data, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
