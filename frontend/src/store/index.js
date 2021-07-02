import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth.slice";
import { chatReducer } from "./chat.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
