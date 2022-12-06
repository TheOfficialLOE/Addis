import { configureStore } from "@reduxjs/toolkit";
import { conversationReducer, updateConversation } from "./slices/conversations/conversationsSlice";
import { userReducer } from "./slices/user/userSlice";
import { addMessage, selectedConversationReducer } from "./slices/selectedConversation/selectedConversationSlice";
import { socket } from "../util/SocketContext";
import { Socket } from "socket.io-client";
import { SerializedConversation } from "@api/modules/gateway/serialized/SerializedConversation";
import { SerializedMessage } from "@api/modules/gateway/serialized/SerializedMessage";

export const socketMiddleWare = (socket: Socket) => {
  return ({ dispatch }) => {
    socket.on("onMessage", (payload: {
      conversation: SerializedConversation,
      message: SerializedMessage
    }) => {
      dispatch(addMessage({
        conversationId: payload.conversation.id,
        id: payload.message.id,
        authorId: payload.message.authorId,
        content: payload.message.content
      }))
      dispatch(updateConversation({
        id: payload.conversation.id,
        creator: payload.conversation.creator,
        recipient: payload.conversation.recipient,
        lastMessage: {
          authorId: payload.message.authorId,
          content: payload.message.content
        }
      }));
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
