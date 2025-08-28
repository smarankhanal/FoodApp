import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchFoodItems = createAsyncThunk(
  "foodItems/fetchFoodItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/food-items");

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch food items"
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const foodItemSlice = createSlice({
  name: "foodItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default foodItemSlice.reducer;
