import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationById } from "../../../util/api";

export const fetchConversationThunk = createAsyncThunk("selectedConversation/fetch", async (id: string) => {
  const { data: conversation } = await getConversationById(id);
  return conversation.data;
})
