import { API } from "../../../Axios";

export const State_City = {
  GetStates: async () => {
    try {
      const res = await API.get("/states", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetCityBYStateId: async (id) => {
    try {
      const res = await API.get(`/cities/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
