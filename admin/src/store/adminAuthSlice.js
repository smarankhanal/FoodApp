import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const loginAdmin = createAsyncThunk(
  "auth/adminAuthSlice/loginAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/login", adminData);
      console.log(response);
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Login failed");
    }
  }
);

export const fetchAdminProfile = createAsyncThunk(
  "auth/adminAuthSlice/fetchAdminProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/get-admin");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  admin: null,
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.admin = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.error = action.payload;
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
