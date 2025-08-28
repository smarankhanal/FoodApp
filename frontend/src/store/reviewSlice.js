import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (foodItemId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/users/foodItem/get-review/${foodItemId}`
      );
      return { foodItemId, reviews: response.data.data };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ reviewData, foodItemId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/users/foodItem/add-review/${foodItemId}`,
        reviewData
      );
      return { foodItemId, review: response.data.data };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

const initialState = {
  reviewsByFood: {},
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { foodItemId, reviews } = action.payload;
        state.loading = false;
        state.reviewsByFood[foodItemId] = reviews;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { foodItemId, review } = action.payload;
        state.loading = false;
        if (!state.reviewsByFood[foodItemId]) {
          state.reviewsByFood[foodItemId] = [];
        }
        state.reviewsByFood[foodItemId].push(review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
