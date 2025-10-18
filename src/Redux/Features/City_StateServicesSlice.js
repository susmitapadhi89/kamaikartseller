import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State_City } from "../Services/State_CityApi";

export const GetAllStateData = createAsyncThunk(
  "City_State/All",
  async (_, { rejectWithValue }) => {
    try {
      const res = await State_City.GetStates();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const GetStateWiseCitydata = createAsyncThunk(
  "City/Stateid",
  async (id, { rejectWithValue }) => {
    try {
      const res = await State_City.GetCityBYStateId(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  State: [],
  Cities: [],
  loading: false,
  error: null,
};
export const City_StateServices = createSlice({
  name: "City_StateOpration",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(GetAllStateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllStateData.fulfilled, (state, action) => {
        state.loading = false;
        state.State = action.payload.data;
      })
      .addCase(GetAllStateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(GetStateWiseCitydata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetStateWiseCitydata.fulfilled, (state, action) => {
        state.loading = false;
        state.Cities = action.payload.data;
      })
      .addCase(GetStateWiseCitydata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
