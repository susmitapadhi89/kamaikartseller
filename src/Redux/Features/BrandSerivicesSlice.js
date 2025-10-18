import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AttributeService } from "../Services/AttributeApi";
import { BrandService } from "../Services/BrandAPi";

export const GetAllBrandData = createAsyncThunk(
  "Brandvalue/All",
  async (_, { rejectWithValue }) => {
    try {
      const res = await BrandService.GetAllBrand();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  BrandValue: [],
  Brandloading: false,
  Branderror: null,
};
export const BrandServices = createSlice({
  name: "BrandOpration",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(GetAllBrandData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllBrandData.fulfilled, (state, action) => {
        state.loading = false;
        state.BrandValue = action.payload.data;
      })
      .addCase(GetAllBrandData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
