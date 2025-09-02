import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      console.log(
        "Data being sent to backend:",
        JSON.stringify({ username, password }, null, 2)
      );
      console.log("Data being sent to backend:", { username, password });
      const res = await API.post("/api/auth/register", { username, password });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "ثبت نام ناموفق بود");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Sending login request to:", "/api/auth/login");
      console.log("With data:", userData);
      const res = await API.post("/api/auth/login", userData);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }
      return res.data;
    } catch (error) {
      console.error("❌ Registration failed:");
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error message:", error.message);

      // بازگرداندن پیام خطای دقیق از Backend
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data ||
          "ثبت نام ناموفق بود"
      );
      return rejectWithValue(error.response?.data || "ورود ناموفق بود");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Registration failed! ";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Login failed! ";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
