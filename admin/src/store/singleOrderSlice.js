import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchSingleOrder = createAsyncThunk(
  "user/fetchSingleOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/admin/user=${userId}/order=${orderId}`
      );
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
  order: null,
  loading: false,
  error: null,
};
const singleOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSingleOrder.pending, (state) => {
        state.order = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default singleOrderSlice.reducer;
