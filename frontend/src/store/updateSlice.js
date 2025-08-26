import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserDetails } from "./registerSlice";
export const updateDetails = createAsyncThunk(
  "update/updateDetails",
  async (userDetails, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch("/api/v1/users/account", {
        userDetails,
      });
      const updatedUser = response.data.data;
      dispatch(setUserDetails(updatedUser));
      return updatedUser;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Failed to update");
    }
  }
);

const initialState = {
  details: null,
  loading: false,
  error: null,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateSlice.reducer;
