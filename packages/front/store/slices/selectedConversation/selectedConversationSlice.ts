import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchConversationThunk } from "./selectedConversationThunks";
import { SelectedConversation } from "./types";
import { OnMessageEvent } from "../../../socket/types";

const initialState: SelectedConversation = {
  id: "",
  userA: "",
  userB: "",
  messages: [],
  lastMessageSeenTimeStampUserA: 0,
  lastMessageSeenTimeStampUserB: 0
};

const selectedConversationSlice = createSlice({
  name: "selectedConversation",
  initialState: initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<OnMessageEvent>) => {
      const { conversation, message } = action.payload;
      if (conversation.id === state.id)
        state.messages.push({
          ...message,
          reaction: ""
        });
    },
    updateLastMessageSeen: (state, action) => {
      if (state.id === action.payload.conversationId) {
        if (state.userA === action.payload.userId)
          state.lastMessageSeenTimeStampUserA = Date.now();
        else if (state.userB === action.payload.userId)
          state.lastMessageSeenTimeStampUserB = Date.now();
      }
    },
    addReaction: (state, action) => {
      if (state.id === action.payload.conversationId) {
        const index = state.messages.findIndex(m => m.id === action.payload.messageId);
        state.messages[index].reaction = action.payload.reaction;
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
export const { addMessage, updateLastMessageSeen, addReaction } = selectedConversationSlice.actions;
