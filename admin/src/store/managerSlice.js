import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadFoodItem = createAsyncThunk(
  "foodManager/uploadFoodItem",
  async (foodItemData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/admin/upload-fooditems",
        foodItemData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Food item upload failed");
    }
  }
);

const initialState = {
  foodItem: null,
  loading: false,
  error: null,
};

const managerSlice = createSlice({
  name: "foodManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFoodItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFoodItem.fulfilled, (state, action) => {
        state.loading = false;
        state.foodItem = action.payload;
      })
      .addCase(uploadFoodItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerSlice.reducer;
