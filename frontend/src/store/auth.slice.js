import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api/axios";

export const login = createAsyncThunk("auth/login", async (form, _) => {
  const { data } = await api.post("/login", form);
  return data;
});

export const attemptLogin = createAsyncThunk("auth/attempt-login", async () => {
  const token = localStorage.getItem("@chat-sio:token");
  if (token) {
    const { data } = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { ...data, token };
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggingIn: false,
  },
  reducers: {
    logout: (state, _) => {
      state.user = null;
      localStorage.removeItem("@chat-sio:token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, _) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoggingIn = false;
        state.user = payload;
        localStorage.setItem("@chat-sio:token", payload.token);
      })
      .addCase(attemptLogin.pending, (state, _) => {
        state.isLoggingIn = true;
      })
      .addCase(attemptLogin.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggingIn = false;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export const selectIsLoggingIn = (state) => state.auth.isLoggingIn;
