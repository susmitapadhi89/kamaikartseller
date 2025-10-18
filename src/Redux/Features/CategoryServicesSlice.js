import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryService } from "../Services/CategoryApi";

export const GetMainCategoryData = createAsyncThunk(
  "maincategory/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetMainCategory();

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//get subcategoryby id
export const GetSubCategoryBYID = createAsyncThunk(
  "subcategory/get/id",
  async (parent_id, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetSubCategoryByParent(parent_id);

      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong" // default fallback
      );
    }
  }
);

//get subcategoryby id
export const GetSubSubCategoryBYID = createAsyncThunk(
  "subsubcategory/get/id",
  async (parent_id, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetSubSubCategoryByParent(parent_id);

      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong" // default fallback
      );
    }
  }
);

const initialState = {
  MainCategorydata: [],
  SubCategorydata: [],
  SubSubCategorydata: [],
  loading: false,
  error: null,
};

export const CategoryServices = createSlice({
  name: "CategoryOpration",
  initialState,
  reducers: {
    clearSubAndSubSub: (state) => {
      state.SubCategorydata = [];
      state.SubSubCategorydata = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(GetMainCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMainCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.MainCategorydata = action.payload.data;
      })
      .addCase(GetMainCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetSubCategoryBYID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubCategoryBYID.fulfilled, (state, action) => {
        state.loading = false;

        state.SubCategorydata = action.payload.data;
      })
      .addCase(GetSubCategoryBYID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetSubSubCategoryBYID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubSubCategoryBYID.fulfilled, (state, action) => {
        state.loading = false;

        state.SubSubCategorydata = action.payload.data;
      })
      .addCase(GetSubSubCategoryBYID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearSubAndSubSub } = CategoryServices.actions;
