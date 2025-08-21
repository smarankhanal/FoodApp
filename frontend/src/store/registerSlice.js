import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/users/register-user",
        userData
      );
      return response.data?.data || response.data;
    } catch (error) {
      const backendErrors = error.response?.data?.errors;
      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        return rejectWithValue(backendErrors);
      }
      return rejectWithValue([
        {
          field: "general",
          message: error.response?.data?.message || "Register failed",
        },
      ]);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: [],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = [];
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = [];
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default registerSlice.reducer;
