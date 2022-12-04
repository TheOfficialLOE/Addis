import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationById, postMessage } from "../../../util/api";

export const fetchConversationThunk = createAsyncThunk("selectedConversation/fetch", async (id: string) => {
  const { data: conversation } = await getConversationById(id);
  return conversation.data;
})

export const sendMessageThunk = createAsyncThunk("selectedConversation/send", async (
  payload: {
    conversationId: string,
    message: string
  }
) => {
  await postMessage(payload);
});
