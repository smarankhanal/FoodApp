import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register-user", userData);
      return response.data?.data || response.data;
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
            message: error.response?.data?.message || "Register failed",
          },
        ];
      }

      return rejectWithValue(serializedErrors);
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
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
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
export const { setUserDetails } = registerSlice.actions;
export default registerSlice.reducer;
