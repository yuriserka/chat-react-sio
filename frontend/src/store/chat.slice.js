import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api/axios";

export const getAvailableRooms = createAsyncThunk(
  "chat/get-available-rooms",
  async (token) => {
    const { data } = await api.get("/rooms/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedChatIndex: null,
    isLoading: false,
    availableRooms: null,
  },
  reducers: {
    setCurrentChat: (state, { payload }) => {
      state.selectedChatIndex = payload;
    },
    quitChat: (state, _) => {
      state.selectedChatIndex = null;
    },
    receiveMessage: (state, { payload }) => {
      state.availableRooms[state.selectedChatIndex].messages.push(payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAvailableRooms.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getAvailableRooms.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.availableRooms = payload;
      }),
});

export const chatReducer = chatSlice.reducer;

export const { setCurrentChat, quitChat, receiveMessage, joinChat } =
  chatSlice.actions;

export const selectActualChat = (state) =>
  state.chat.availableRooms[state.chat.selectedChatIndex];

export const selectChats = (state) => state.chat.availableRooms;

export const selectFetchingChats = (state) => state.chat.isLoading;
