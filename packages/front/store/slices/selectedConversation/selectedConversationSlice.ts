import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchConversationThunk } from "./selectedConversationThunks";
import { Message, SelectedConversation } from "./types";
import { OnMessageEvent } from "../../../socket/types";

const initialState: SelectedConversation = {
  id: "",
  creatorId: "",
  recipientId: "",
  messages: []
};

const selectedConversationSlice = createSlice({
  name: "selectedConversation",
  initialState: initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<OnMessageEvent>) => {
      const { conversation, message } = action.payload;
      if (conversation.id === state.id)
        state.messages.push(message);
    },
    markAsSeen: (state, action) => {
      if (action.payload === state.id) {
        state.messages.forEach(message => {
          const index = state.messages.findIndex(m => m.id === message.id);
          state.messages[index].isSeen = true;
        });
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchConversationThunk.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectedConversationReducer = selectedConversationSlice.reducer;
export const selectConversation = (state: RootState) => state.selectedConversation;
export const { addMessage, markAsSeen } = selectedConversationSlice.actions;
