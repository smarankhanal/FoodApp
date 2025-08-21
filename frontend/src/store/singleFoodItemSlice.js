import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchSingleFoodItem = createAsyncThunk(
  "singleFood/fetchSingleFoodItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/users/foodItem/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fooditems"
      );
    }
  }
);
const initialState = { item: {}, loading: false, error: null };
const singleFoodItemSlice = createSlice({
  name: "singleFood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleFoodItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleFoodItem.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchSingleFoodItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default singleFoodItemSlice.reducer;
