import { API } from "../../../Axios";

export const BrandService = {
  GetAllBrand: async () => {
    try {
      const res = await API.get("/brand/", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
