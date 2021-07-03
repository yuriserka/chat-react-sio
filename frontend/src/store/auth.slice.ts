import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../models/user";
import { api } from "../services/api/axios";

type LoginForm = {
  username: string;
  nickname: string;
  password: string;
};

export const login = createAsyncThunk(
  "auth/login",
  async (form: LoginForm, _) => {
    const { data } = await api.post<User>("/login", form);
    return data;
  }
);

export const attemptLogin = createAsyncThunk("auth/attempt-login", async () => {
  const token = localStorage.getItem("@chat-sio:token");
  if (token) {
    const { data } = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { ...data, token } as User;
  }
  return null;
});

export type AuthState = {
  user: User | null;
  isLoggingIn: boolean;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggingIn: false,
  } as AuthState,
  reducers: {
    logout: (state, _: PayloadAction<void>) => {
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

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsLoggingIn = (state: RootState) => state.auth.isLoggingIn;
