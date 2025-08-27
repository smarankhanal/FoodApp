import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const changePassword = createAsyncThunk(
  "password/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/v1/users/change-password", {
        oldPassword,
        newPassword,
      });
      console.log(response);
      return response.data;
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
  success: false,
  error: null,
  loading: false,
};
const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export default passwordSlice.reducer;
