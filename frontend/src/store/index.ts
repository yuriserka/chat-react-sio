import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authReducer } from "./auth.slice";
import { chatReducer } from "./chat.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
