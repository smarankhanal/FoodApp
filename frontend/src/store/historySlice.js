import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/purchase-history");
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  }
);

export const fetchSingleHistory = createAsyncThunk(
  "history/fetchSingleHistory",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/orders/${orderId}`);
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  }
);

const initialState = {
  history: [],
  singleHistory: null,
  error: null,
  loading: false,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(fetchSingleHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.singleHistory = action.payload;
      })
      .addCase(fetchSingleHistory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Error fetching single history";
      });
  },
});

export default historySlice.reducer;
