import { configureStore } from "@reduxjs/toolkit";
import {
  conversationReducer, updateConversationForNewMessage,
} from "./slices/conversations/conversationsSlice";
import { userReducer } from "./slices/user/userSlice";
import {
  addMessage, addReaction,
  selectedConversationReducer, updateLastMessageSeen,
} from "./slices/selectedConversation/selectedConversationSlice";
import { Socket } from "socket.io-client";
import { OnMessageEvent } from "../socket/types";
import { socket } from "../socket";
import { postLastSeenMessages } from "../util/api";

export const socketMiddleWare = (socket: Socket) => {
  return ({ dispatch, getState }) => {
    socket.on("onMessage", (payload: OnMessageEvent) => {
      dispatch(addMessage(payload));
      dispatch(updateConversationForNewMessage(payload));
      if (getState().selectedConversation.id === payload.conversation.id)
        postLastSeenMessages(payload.conversation.id);
    });
    socket.on("onSeenMessages", (payload) => {
      dispatch(updateLastMessageSeen(payload));
    });
    socket.on("onReaction", (payload) => {
      dispatch(addReaction(payload));
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
