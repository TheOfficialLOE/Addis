import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getMe } from "../../util/api";

type User = {
  id: string,
  email: string,
  name: string,
  username?: string
};

const user: User = {
  id: "",
  email: "",
  name: "",
  username: "",
}

const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const { data: user } = await getMe();
  return user.data;
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
