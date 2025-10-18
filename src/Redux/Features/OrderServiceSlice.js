import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderDetailService } from "../Services/OrderAPi";

// Async thunks

export const GetSellerOrders = createAsyncThunk(
  "order/GetSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await OrderDetailService.GetOrderDetails();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetSellerOrdersByID = createAsyncThunk(
  "order/GetSellerOrdersbyid",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await OrderDetailService.GetOrderDetailsByID(orderId);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
// export const UpdateOrderStatus = createAsyncThunk(
//   "order/UpdateOrderStatus",
//   async ({ orderId, status }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/seller/orders/${orderId}/status`, {
//         status,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const DownloadOrderInvoice = createAsyncThunk(
//   "order/DownloadOrderInvoice",
//   async (orderId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/seller/orders/${orderId}/invoice`, {
//         responseType: "blob",
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// Slice
export const orderServices = createSlice({
  name: "OrderOpration",
  initialState: {
    orders: [],
    PersonalOrderData: [],
    loading: false,
    error: null,
    OrderPagination: null,
    currentOrder: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Seller Orders
      .addCase(GetSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.OrderPagination = {
          totalItems: action.payload.totalOrders,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          pageSize: action.payload.pageSize,
        };
      })
      .addCase(GetSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetSellerOrdersByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSellerOrdersByID.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        console.log(action.payload.data);

        state.PersonalOrderData = action.payload.data;
      })
      .addCase(GetSellerOrdersByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
