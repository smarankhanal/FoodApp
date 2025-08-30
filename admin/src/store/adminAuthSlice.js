import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const loginAdmin = createAsyncThunk(
  "auth/adminAuthSlice",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/admin/login", adminData);
      localStorage.setItem("token", response.data.data.token);
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Login failed");
    }
  }
);
export const fetchAdminProfile = createAsyncThunk(
  "auth/fetchAdminProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const response = await axios.get("/api/v1/admin/get-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const initialState = {
  admin: null,
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
};
const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state) => {
        state.loading = false;
        state.admin = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});
export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
