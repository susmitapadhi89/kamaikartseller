import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthServices } from "../Services/AuthAPi";

// ============================
// 🌀 Async Thunks
// ============================

export const Login = createAsyncThunk(
  "/Login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthServices.Login(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const Register = createAsyncThunk(
  "/Register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthServices.Register(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const Logout = createAsyncThunk(
  "/Logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().AuthOpration.token;

      const res = await AuthServices.Logout(token);

      return res.data; // return only data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  isLoggedIn: false,
  autherror: null,
  success: false,
};

export const AuthService = createSlice({
  name: "authOpration",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.autherror = null;
      })

      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "seller",
          JSON.stringify(action.payload.data.user)
        ); // 👈 cache

        state.isLoggedIn = true;

        state.user = action.payload.data.user; // ✅ save user data
      })

      .addCase(Register.pending, (state) => {
        state.loading = true;
        state.autherror = null;
      })

      .addCase(Register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.autherror = action.payload;
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.autherror = null;
      })

      .addCase(Logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // ✅ save user data
        state.isLoggedIn = false;

        localStorage.removeItem("seller");
        localStorage.removeItem("isLoggedIn");
      })

      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.autherror = action.payload;
      });
  },
});
export const { logout } = AuthService.actions;
