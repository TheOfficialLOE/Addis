import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllConversations } from "../../../util/api";

export const fetchConversationsThunk = createAsyncThunk("conversation/fetch", async () => {
  const { data: conversations } = await getAllConversations();
  return conversations.data;
});
