import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderDetailService } from "../Services/OrderAPi";

// Async thunks

export const GetSellerOrders = createAsyncThunk(
  "order/GetSellerOrders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await OrderDetailService.GetOrderDetails(query);

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
export const UpdateOrderStatus = createAsyncThunk(
  "order/UpdateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const data = await OrderDetailService.ChangedOrderStatus(orderId, status);
      return { orderId, status, response: data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
    orderloading: false,
    ordererror: null,
    OrderPagination: null,
    currentOrder: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.ordererror = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Seller Orders
      .addCase(GetSellerOrders.pending, (state) => {
        state.orderloading = true;
        state.ordererror = null;
      })
      .addCase(GetSellerOrders.fulfilled, (state, action) => {
        state.orderloading = false;
        state.orders = action.payload.data;
        state.OrderPagination = {
          totalOrders: action.payload.totalOrders,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          pageSize: action.payload.pageSize,
        };
      })
      .addCase(GetSellerOrders.rejected, (state, action) => {
        state.orderloading = false;
        state.ordererror = action.payload;
      })
      .addCase(GetSellerOrdersByID.pending, (state) => {
        state.orderloading = true;
        state.ordererror = null;
      })
      .addCase(GetSellerOrdersByID.fulfilled, (state, action) => {
        state.orderloading = false;

        state.PersonalOrderData = action.payload.data;
      })
      .addCase(GetSellerOrdersByID.rejected, (state, action) => {
        state.orderloading = false;
        state.ordererror = action.payload;
      })
      .addCase(UpdateOrderStatus.pending, (state) => {
        state.orderloading = true;
      })
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        state.orderloading = false;
        const { orderId, status } = action.payload;
        // ✅ update local state instantly
        state.orders = state.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        );
      })
      .addCase(UpdateOrderStatus.rejected, (state, action) => {
        state.orderloading = false;
        state.ordererror = action.payload;
      });
  },
});
