import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "../../../util/api";

export const fetchUserThunk = createAsyncThunk("user/fetch", async () => {
  const { data: user } = await getMe();
  return user.data;
});
