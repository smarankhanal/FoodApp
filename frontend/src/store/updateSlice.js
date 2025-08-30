import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUserDetails } from "./registerSlice";
import api from "../api/axios";
export const updateDetails = createAsyncThunk(
  "update/updateDetails",
  async (userDetails, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.patch("/users/account", userDetails);
      const updatedUser = response.data.data;
      dispatch(setUserDetails(updatedUser));
      return updatedUser;
    } catch (error) {
      let serializedErrors = [];

      const backendErrors = error.response?.data?.errors;
      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        serializedErrors = backendErrors.map((e) => ({
          field: e.field || "general",
          message: e.message || "Something went wrong",
        }));
      } else {
        serializedErrors = [
          {
            field: "general",
            message: error.response?.data?.message || "Failed to update",
          },
        ];
      }
      console.log(serializedErrors);
      return rejectWithValue(serializedErrors);
    }
  }
);

const initialState = {
  details: null,
  loading: false,
  error: [],
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDetails.pending, (state) => {
        state.loading = true;
        state.error = [];
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
        state.error = [];
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateSlice.reducer;
