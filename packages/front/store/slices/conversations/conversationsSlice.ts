import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getAllConversations } from "../../../util/api";
import { fetchConversationsThunk } from "./conversationsThunks";

type Conversation = {
  id: string;
  creator: {
    id: string;
    name: string;
    username: string;
  };
  recipient: {
    id: string;
    name: string;
    username: string;
  };
  lastMessage: {
    authorId: string;
    content: string
  };
};

const conversations: Conversation[] = [];

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: conversations,
  reducers: {
    updateConversation: (state, action) => {
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
