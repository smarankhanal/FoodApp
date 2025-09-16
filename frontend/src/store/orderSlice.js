import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
const initialState = {
  orders: [],
  error: null,
  loading: false,
};
export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (foodItems, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/orders`, foodItems);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue("Failed to post order");
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders.push(action.payload);
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default orderSlice.reducer;
