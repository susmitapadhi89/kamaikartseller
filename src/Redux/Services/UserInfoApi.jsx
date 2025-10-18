import { API } from "../../../Axios";

export const UserInfo = {
  GetUserInfo: async () => {
    try {
      const res = await API.get("/auth/profile", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  UpdateUserInfo: async (data) => {
    try {
      const res = await API.post("/seller/update-profile", data, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
