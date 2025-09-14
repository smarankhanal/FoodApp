import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchFoodItem = createAsyncThunk(
  "foodItem/fetchFoodItem",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/all-fooditem");

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
  foodItems: [],
  loading: false,
  error: null,
};
const foodItemSlice = createSlice({
  name: "foodItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodItem.fulfilled, (state, action) => {
        state.foodItems = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFoodItem.pending, (state) => {
        state.foodItems = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default foodItemSlice.reducer;
