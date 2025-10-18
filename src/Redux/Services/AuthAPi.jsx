import { API } from "../../../Axios";

export const AuthServices = {
  // Add

  Login: async (data) => {
    try {
      const res = await API.post("/auth/signin", data, {
        credentials: "include",
      });
      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Register
  Register: async (data) => {
    try {
      const res = await API.post("/seller/registration", data);

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //Logout

  Logout: async () => {
    try {
      const res = await API.post("/auth/logout", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
