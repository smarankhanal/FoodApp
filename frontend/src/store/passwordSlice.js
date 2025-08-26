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
      console.log(error);
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "failed to change password");
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
