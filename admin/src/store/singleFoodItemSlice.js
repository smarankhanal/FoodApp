import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
export const fetchSingleFoodItem = createAsyncThunk(
  "singleFoodItem/fetchSingleFoodItem",
  async (foodItemId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/food-item/${foodItemId}`);
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
export const deleteFoodItem = createAsyncThunk(
  "singleFoodItem/deleteFoodItem",
  async (foodItemId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/food-item/${foodItemId}/delete`);
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
  foodItem: null,
  loading: false,
  error: null,
};
const singleFoodItemSlice = createSlice({
  name: "singleFoodItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleFoodItem.fulfilled, (state, action) => {
        state.foodItem = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSingleFoodItem.pending, (state) => {
        state.foodItem = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleFoodItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFoodItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFoodItem.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(deleteFoodItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default singleFoodItemSlice.reducer;
