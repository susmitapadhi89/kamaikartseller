import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../Services/UserInfoApi";

export const GetUserInformation = createAsyncThunk(
  "UserInfo/GetUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserInfo.GetUserInfo();

      return res.data; // return only data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const UpdateUserInformation = createAsyncThunk(
  "UserInfo/UpdateUserInfo",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await UserInfo.UpdateUserInfo(data);

      return res.data; // return only data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
const initialState = {
  GetinfoDetail: null,
  loading: false,
  error: null,
};

export const UserInfoServices = createSlice({
  name: "UserInfoOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  Get item
      .addCase(GetUserInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.GetinfoDetail = action.payload.data;
      })
      .addCase(GetUserInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(UpdateUserInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.GetinfoDetail = action.payload.data;
      })
      .addCase(UpdateUserInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
