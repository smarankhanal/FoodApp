import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const cancelUserOrder = createAsyncThunk(
  "cancelOrder/cancelUserOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/orders/${orderId}/status`);

      return response.data.data;
    } catch (error) {
      console.log(error);
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Status changed failed");
    }
  }
);

const cancelOrderSlice = createSlice({
  name: "cancelOrder",
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(cancelUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cancelOrderSlice.reducer;
