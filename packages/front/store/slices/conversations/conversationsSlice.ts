import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchConversationsThunk } from "./conversationsThunks";
import { Conversation } from "./types";
import { OnMessageEvent } from "../../../socket/types";

const conversations: {
  conversations: Conversation[],
  openConversationId: string
} = {
  conversations: [],
  openConversationId: ""
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: conversations,
  reducers: {
    updateConversationForNewMessage: (state, action: PayloadAction<OnMessageEvent>) => {
      const index = state.conversations.findIndex((c) => c.id === action.payload.conversation.id);
      const conversation = state.conversations[index];
      state.conversations.splice(index, 1);
      state.conversations.unshift({
        ...action.payload.conversation,
        lastMessage: {
          authorId: action.payload.message.authorId,
          content: action.payload.message.content,
          sentAt: action.payload.message.sentAt
        },
        unread: state.openConversationId === action.payload.conversation.id ? 0 : conversation.unread + 1
      });
    },
    updateOpenConversationId: (state, action: PayloadAction<string>) => {
      state.openConversationId = action.payload;
      const index = state.conversations.findIndex((c) => c.id === action.payload);
      state.conversations[index].unread = 0
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      state.conversations = action.payload as unknown as Conversation[];
    });
  }
});

export const conversationReducer = conversationsSlice.reducer;
export const selectConversations = (state: RootState) => state.conversations;
export const { updateConversationForNewMessage, updateOpenConversationId } = conversationsSlice.actions;
