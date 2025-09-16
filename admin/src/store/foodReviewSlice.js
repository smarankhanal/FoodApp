import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchFoodReview = createAsyncThunk(
  "review/fetchFoodReview",
  async (foodItemId, { rejectWithValue }) => {
    console.log(foodItemId);
    try {
      const response = await api.get(`/admin/food-item/${foodItemId}/reviews`);

      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Review failed to fetch");
    }
  }
);
export const fetchFoodReviewOfUser = createAsyncThunk(
  "review/fetchFoodReviewOfUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/admin/user/${userId}/food-reviews`);

      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Review failed to fetch");
    }
  }
);
const initialState = {
  reviews: [],
  reviewsByUser: [],
  loading: false,
  error: false,
};
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFoodReview.pending, (state) => {
        state.reviews = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFoodReviewOfUser.fulfilled, (state, action) => {
        state.reviewsByUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFoodReviewOfUser.pending, (state) => {
        state.reviewsByUser = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodReviewOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default reviewSlice.reducer;
