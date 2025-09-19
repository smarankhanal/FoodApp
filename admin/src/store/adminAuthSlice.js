import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const loginAdmin = createAsyncThunk(
  "auth/adminAuthSlice/loginAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/login", adminData);
      const { token } = response.data.data;

      localStorage.setItem("token", token);
      return token;
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

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { adminLogout, clearError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
