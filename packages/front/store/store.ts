import { configureStore } from "@reduxjs/toolkit";
import { conversationReducer, updateConversation } from "./slices/conversations/conversationsSlice";
import { userReducer } from "./slices/user/userSlice";
import { addMessage, selectedConversationReducer } from "./slices/selectedConversation/selectedConversationSlice";
import { socket } from "../util/SocketContext";
import { Socket } from "socket.io-client";

export const socketMiddleWare = (socket: Socket) => {
  return ({ dispatch }) => {
    socket.on("onMessage", (payload) => {
      dispatch(addMessage({
        id: payload.message._id,
        authorId: payload.message.props.author._id,
        content: payload.message.props.content
      }));
      dispatch(updateConversation({
        id: payload.conversation._id,
        creator: {
          id: payload.conversation.props.creator._id,
          name: payload.conversation.props.creator.props.name,
          username: payload.conversation.props.creator.props.username,
        },
        recipient: {
          id: payload.conversation.props.recipient._id,
          name: payload.conversation.props.recipient.props.name,
          username: payload.conversation.props.recipient.props.username,
        },
        lastMessage: {
          authorId: payload.message.props.author._id,
          content: payload.message.props.content
        }
      }))
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
