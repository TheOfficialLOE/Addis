import ScrollableFeed from "react-scrollable-feed";
import { useAppSelector } from "../../hooks/hooks";
import { selectConversation } from "../../store/slices/selectedConversation/selectedConversationSlice";
import { selectConversations } from "../../store/slices/conversations/conversationsSlice";
import MessageBubble from "./MessageBubble";
import { selectUser } from "../../store/slices/user/userSlice";

const MessagesList = () => {
  const user = useAppSelector(selectUser);
  const { openConversationId } = useAppSelector(selectConversations);
  const conversation = useAppSelector(selectConversation);

  return <ScrollableFeed>
    <div className="mx-8">
      {openConversationId && conversation.messages.map(message => <MessageBubble user={user} conversation={conversation} message={message}/>)}
    </div>
  </ScrollableFeed>
};

export default MessagesList;
