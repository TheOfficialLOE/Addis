import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchConversationsThunk } from "./conversationsThunks";
import { Conversation } from "./types";
import { OnMessageEvent } from "../../../socket/types";

const conversations: Conversation[] = [];

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: conversations,
  reducers: {
    updateConversation: (state, action: PayloadAction<OnMessageEvent>) => {
      const { conversation, message } = action.payload;
      const index = state.findIndex((c) => c.id === conversation.id);
      state.splice(index, 1);
      state.unshift({
        ...conversation,
        lastMessage: {
          authorId: message.authorId,
          content: message.content
        }
      });
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
