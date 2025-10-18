import { API } from "../../../Axios";

export const CategoryService = {
  GetMainCategory: async () => {
    try {
      const res = await API.get("/categories?parent_id=null", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetSubCategoryByParent: async (parent_id) => {
    const res = await API.get(`/categories?parent_id=${parent_id}`, {
      withCredentials: true,
    });
    return res.data;
  },

  GetSubSubCategoryByParent: async (parent_id) => {
    const res = await API.get(`/categories?parent_id=${parent_id}`, {
      withCredentials: true,
    });
    return res.data;
  },
};
