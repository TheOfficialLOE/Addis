import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchUserThunk } from "./userThunks";

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
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
