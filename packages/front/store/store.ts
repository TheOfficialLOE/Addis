import { configureStore } from "@reduxjs/toolkit";
import {
  conversationReducer, updateConversationForNewMessage, updateUnread,
} from "./slices/conversations/conversationsSlice";
import { userReducer } from "./slices/user/userSlice";
import {
  addMessage,
  markAsSeen,
  selectedConversationReducer,
} from "./slices/selectedConversation/selectedConversationSlice";
import { Socket } from "socket.io-client";
import { OnMessageEvent } from "../socket/types";
import { socket } from "../socket";
import { SerializedConversation } from "@api/modules/gateway/serialized/SerializedConversation";
import { SerializedMessage } from "@api/modules/gateway/serialized/SerializedMessage";

export const socketMiddleWare = (socket: Socket) => {
  return ({ dispatch }) => {
    socket.on("onMessage", (payload: OnMessageEvent) => {
      dispatch(addMessage(payload));
      dispatch(updateConversationForNewMessage(payload));
    });
    socket.on("onRead", (conversation: SerializedConversation) => {
      dispatch(markAsSeen(conversation.id));
      dispatch(updateUnread(conversation.id));
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
