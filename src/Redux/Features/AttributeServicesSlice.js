import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AttributeService } from "../Services/AttributeApi";

export const GetAllAttributeData = createAsyncThunk(
  "attributevalue/All",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AttributeService.GetAllAttribute();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetAttributeDataByID = createAsyncThunk(
  "attributevalue/BYID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await AttributeService.GetAttributeBYID(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//In Edit Product only  , if any attributevalue deleted so
export const GetVarientDataDependOnAttributeValue = createAsyncThunk(
  "varientdata/BYattributevalue",
  async (data, { rejectWithValue }) => {
    try {
      const res =
        await AttributeService.AttributeValueRemove_nd_VarientvalueGet(data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
const initialState = {
  AttributeValue: [],
  GetVarientDataDependOnAttribute: [],
  PersonalAttributedata: null,
  Attributeloading: false,
  Attributeerror: null,
};
export const AttributeServices = createSlice({
  name: "AttributeOpration",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(GetAllAttributeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllAttributeData.fulfilled, (state, action) => {
        state.loading = false;
        state.AttributeValue = action.payload.data;
      })
      .addCase(GetAllAttributeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(GetAttributeDataByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAttributeDataByID.fulfilled, (state, action) => {
        state.loading = false;
        state.PersonalAttributedata = action.payload.data;
      })
      .addCase(GetAttributeDataByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(GetVarientDataDependOnAttributeValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetVarientDataDependOnAttributeValue.fulfilled,
        (state, action) => {
          state.loading = false;
          state.GetVarientDataDependOnAttribute = action.payload.data;
        }
      )
      .addCase(
        GetVarientDataDependOnAttributeValue.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});
