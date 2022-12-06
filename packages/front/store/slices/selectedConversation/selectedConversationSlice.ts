import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchConversationThunk } from "./selectedConversationThunks";
import { Message, SelectedConversation } from "./types";

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
    addMessage: (state, action: PayloadAction<Message & {
      conversationId: string;
    }>) => {
      if (action.payload.conversationId === state.id)
        state.messages.push(action.payload);
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
export const { addMessage } = selectedConversationSlice.actions;
