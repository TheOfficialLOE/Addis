import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getConversationById, postMessage } from "../../../util/api";
import { fetchConversationThunk } from "./selectedConversationThunks";

// const messagesAdapter = createEntityAdapter<{
//   id: string,
//
//   creator: {
//     id: string,
//     name: string,
//     username: string,
//   },
//
//   recipient: {
//     id: string,
//     name: string,
//     username: string,
//   },
//
//   messages: {
//     id: string,
//     authorId: string,
//     content: string,
//     // sentAt: string;
//   }[]
// }>();

type SelectedConversation = {
  id: string;
  creatorId: string;
  recipientId: string;
  messages: {
    id: string,
    authorId: string,
    content: string,
    // sentAt: string,
    // isSeen: boolean,
  }[];
};

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
    addMessage: (state, action) => {
      state.messages.push({
        ...action.payload
      });
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
