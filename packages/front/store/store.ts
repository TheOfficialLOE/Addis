import { configureStore } from "@reduxjs/toolkit";
import { conversationReducer, updateConversation } from "./slices/conversations/conversationsSlice";
import { userReducer } from "./slices/user/userSlice";
import { addMessage, selectedConversationReducer } from "./slices/selectedConversation/selectedConversationSlice";
import { Socket } from "socket.io-client";
import { OnMessageEvent } from "../socket/types";
import { socket } from "../socket";

export const socketMiddleWare = (socket: Socket) => {
  return ({ dispatch }) => {
    socket.on("onMessage", (payload: OnMessageEvent) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload));
    });
    return next => action => {
      return next(action);
    }
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationReducer,
    selectedConversation: selectedConversationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleWare(socket)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
