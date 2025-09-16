import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
export const fetchSingleUser = createAsyncThunk(
  "singleUser/fetchSingleUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/user/${userId}`);
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Order failed to fetch");
    }
  }
);
export const deleteUser = createAsyncThunk(
  "singleUser/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/user/${userId}`);
      return userId;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Order failed to fetch");
    }
  }
);
export const fetchUserHistory = createAsyncThunk(
  "singleUser/fetchUserHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/user/${userId}/history`);
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Order failed to fetch");
    }
  }
);
const initialState = {
  user: null,
  userHistory: null,
  error: null,
  loading: null,
};
const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSingleUser.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserHistory.fulfilled, (state, action) => {
        state.userHistory = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserHistory.pending, (state) => {
        state.userHistory = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default singleUserSlice.reducer;
