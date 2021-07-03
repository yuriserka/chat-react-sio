import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Message } from "../models/message";
import { Room } from "../models/room";
import { api } from "../services/api/axios";

export const getAvailableRooms = createAsyncThunk(
  "chat/get-available-rooms",
  async (token: string) => {
    const { data } = await api.get<Room[]>("/rooms/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

export type ChatState = {
  selectedChatIndex: number;
  isLoading: boolean;
  availableRooms: Room[] | null;
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedChatIndex: -1,
    isLoading: false,
    availableRooms: null,
  } as ChatState,
  reducers: {
    setCurrentChat: (state, { payload }: PayloadAction<number>) => {
      state.selectedChatIndex = payload;
    },
    quitChat: (state, _: PayloadAction<void>) => {
      state.selectedChatIndex = -1;
    },
    receiveMessage: (state, { payload }: PayloadAction<Message>) => {
      state.availableRooms?.[state.selectedChatIndex].messages.push(payload);
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

export const { setCurrentChat, quitChat, receiveMessage } = chatSlice.actions;

export const selectActualChat = (state: RootState) =>
  state.chat.availableRooms?.[state.chat.selectedChatIndex];

export const selectChats = (state: RootState) => state.chat.availableRooms;

export const selectFetchingChats = (state: RootState) => state.chat.isLoading;
