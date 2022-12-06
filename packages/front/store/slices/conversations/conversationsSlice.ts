import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchConversationsThunk } from "./conversationsThunks";
import { Conversation } from "./types";

const conversations: Conversation[] = [];

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: conversations,
  reducers: {
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const conversation = action.payload;
      const index = state.findIndex((c) => c.id === conversation.id);
      state.splice(index, 1);
      state.unshift(conversation);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      return action.payload as unknown as Conversation[];
    });
  }
});

export const conversationReducer = conversationsSlice.reducer;
export const selectConversations = (state: RootState) => state.conversations;
export const { updateConversation } = conversationsSlice.actions;
