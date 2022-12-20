import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectConversations, updateOpenConversationId } from "../store/slices/conversations/conversationsSlice";
import { fetchConversationsThunk } from "../store/slices/conversations/conversationsThunks";
import {
  fetchConversationThunk,
} from "../store/slices/selectedConversation/selectedConversationThunks";
import { fetchUserThunk } from "../store/slices/user/userThunks";
import { postLastSeenMessages } from "../util/api";
import ConversationsList from "../components/conversations/ConversationsList";
import MessagesScreen from "../components/messages/MessagesScreen";

const Index = () => {
  const { openConversationId } = useAppSelector(selectConversations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk());
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (openConversationId !== "") {
      dispatch(fetchConversationThunk(openConversationId));
      dispatch(updateOpenConversationId(openConversationId));
      postLastSeenMessages(openConversationId);
    }
  }, [openConversationId, dispatch]);

  return <div className="h-screen">
    <div className="grid grid-cols-[min-content_auto] grid-flow-dense h-full">
      <ConversationsList />
      {openConversationId &&
        <MessagesScreen />
      }
    </div>
  </div>
};

export default Index;
