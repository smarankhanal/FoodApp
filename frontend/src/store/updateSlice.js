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
      let serializedErrors = [];

      const backendErrors = error.response?.data?.errors;
      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        serializedErrors = backendErrors.map((e) => ({
          field: e.path || "general",
          message: e.message || "Something went wrong",
        }));
      } else {
        serializedErrors = [
          {
            field: "general",
            message: error.response?.data?.message || "Register failed",
          },
        ];
      }
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
