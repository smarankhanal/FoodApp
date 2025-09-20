import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
export const fetchSingleOrder = createAsyncThunk(
  "singleOrder/fetchSingleOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/user/${userId}/order/${orderId}`);
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Order failed to fetch");
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "singleOrder/updateOrderStatus",
  async ({ userId, orderId, status }, { rejectWithValue }) => {
    console.log(status);
    try {
      const response = await api.patch(
        `/admin/user/${userId}/order/${orderId}/status`,
        {
          status,
        }
      );

      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Order failed to fetch");
    }
  }
);
const initialState = {
  order: null,
  loading: false,
  error: null,
};
const singleOrderSlice = createSlice({
  name: "singleOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSingleOrder.pending, (state) => {
        state.order = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.order = {
          ...state.order,
          status: action.payload.status,
        };

        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default singleOrderSlice.reducer;
