// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import api from "../api/axios";

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ identifier, password }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/login", {
//         identifier,
//         password,
//       });

//       localStorage.setItem("token", response.data.data.accessToken);
//       return response.data.data;
//     } catch (error) {
//       const serializedError = {
//         message: error.response?.data?.message || error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       };
//       return rejectWithValue(serializedError || "Login failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: localStorage.getItem("token") || null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.token = action.payload.accessToken;
//         state.user = action.payload.user;
//         localStorage.setItem("token", action.payload.accessToken);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ identifier, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", {
        identifier,
        password,
      });
      localStorage.setItem("token", response.data.data.accessToken);
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

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      const serializedError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError || "Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
