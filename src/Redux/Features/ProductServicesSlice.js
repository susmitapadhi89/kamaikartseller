import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductService } from "../Services/ProductAPI";

export const CreateProduct = createAsyncThunk(
  "Product/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ProductService.AddProductSimple(data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetAllProductdata = createAsyncThunk(
  "Product/Getall",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();

      const res = await ProductService.GetAllProduct(query);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetProductdatabyId = createAsyncThunk(
  "Product/Get/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await ProductService.GetProductviaID(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const DeleteProductbyID = createAsyncThunk(
  "Product/delete/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await ProductService.DeleteProduct(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  "Product/Update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await ProductService.UpdateProduct(id, data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  Products: [],
  Product: null,
  PersonalProductdata: null,
  Pagination: null,
  loading: false,
  producterror: null,
};
export const ProductServices = createSlice({
  name: "ProductOpration",
  initialState,
  reducers: {
    resetProductData: (state) => {
      state.PersonalProductdata = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  Add item
      .addCase(CreateProduct.pending, (state) => {
        state.loading = true;
        state.producterror = null;
      })
      .addCase(CreateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.producterror = null;
        state.Product = action.payload.data;
      })
      .addCase(CreateProduct.rejected, (state, action) => {
        state.loading = false;
        state.producterror = action.payload;
      })
      .addCase(GetAllProductdata.pending, (state) => {
        state.loading = true;
        state.producterror = null;
      })
      .addCase(GetAllProductdata.fulfilled, (state, action) => {
        state.loading = false;
        state.producterror = null;
        state.Products = action.payload.data;
        state.Pagination = {
          totalItems: action.payload.totalItems,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          pageSize: action.payload.pageSize,
        };
      })
      .addCase(GetAllProductdata.rejected, (state, action) => {
        state.loading = false;
        state.producterror = action.payload;
      })
      .addCase(GetProductdatabyId.pending, (state) => {
        state.loading = true;
        state.producterror = null;
      })
      .addCase(GetProductdatabyId.fulfilled, (state, action) => {
        state.loading = false;
        state.producterror = null;
        state.PersonalProductdata = action.payload.data;
      })
      .addCase(GetProductdatabyId.rejected, (state, action) => {
        state.loading = false;
        state.producterror = action.payload;
      })
      .addCase(DeleteProductbyID.pending, (state) => {
        state.loading = true;
        state.producterror = null;
      })
      .addCase(DeleteProductbyID.fulfilled, (state, action) => {
        state.loading = false;
        state.producterror = null;

        // Assuming API returns deleted product id
        const deletedId = action.payload?.id;

        if (deletedId) {
          state.Products = state.Products.filter((p) => p.id !== deletedId);
        }
      })
      .addCase(DeleteProductbyID.rejected, (state, action) => {
        state.loading = false;
        state.producterror = action.payload;
      })
      .addCase(UpdateProduct.pending, (state) => {
        state.loading = true;
        state.producterror = null;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.producterror = null;
        state.Product = action.payload.data;
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.producterror = action.payload;
      });
  },
});
export const { resetProductData } = ProductServices.actions;
