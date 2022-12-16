import { useAppSelector } from "../../hooks/hooks";
import { selectConversations } from "../../store/slices/conversations/conversationsSlice";
import ConversationListItem from "./ConversationListItem";
import { selectUser } from "../../store/slices/user/userSlice";

const ConversationsList = () => {
  const user = useAppSelector(selectUser);
  const { conversations, openConversationId } = useAppSelector(selectConversations);

  return <ul className="w-96 bg-neutral p-4">
    {conversations.map(conversation =>
      // eslint-disable-next-line react/jsx-key
      <ConversationListItem user={user} conversation={conversation} isOpen={conversation.id === openConversationId} />
    )}
  </ul>
};

export default ConversationsList;
