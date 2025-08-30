import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchOrders = createAsyncThunk(
  "user/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/admin/all-user");
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
const initialState = {
  orders: [],
  loading: false,
  error: null,
};
const orderslice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.orders = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default orderslice.reducer;
