import { Conversation } from "../../store/slices/conversations/types";
import ConversationAvatar from "./ConversationAvatar";
import { useAppDispatch } from "../../hooks/hooks";
import { User } from "../../store/slices/user/userSlice";
import UnreadBadge from "./UnreadBadge";
import { updateOpenConversationId } from "../../store/slices/conversations/conversationsSlice";

const ConversationListItem = (props: {
  user: User
  conversation: Conversation,
  isOpen: boolean;
}) => {
  const user = props.user;

  const {
    id,
    userA,
    userB,
    lastMessage,
    unread,
  } = props.conversation;

  const recipient = user.id === userA.id ? userB : userA;

  const dispatch = useAppDispatch();

  return <li className={`btn justify-start w-full h-20 ${
    props.isOpen && "btn-primary"
  }`} key={id} onClick={() => {
    dispatch(updateOpenConversationId(id));
  }
  }>
    <ConversationAvatar firstLetter={recipient.name[0]} />

    <div className="ml-4 flex flex-col items-start">
      <p className="text-white font-bold">{
        recipient.name
      }</p>
      <p className="text-sm mt-2">{
        lastMessage.authorId === user.id && "YOU: "
      }{lastMessage.content}</p>
    </div>

    <div className="flex flex-col items-end items-end grow">
      <p>{
        new Date(lastMessage.sentAt)
          .toLocaleString("en-US", { hour: "numeric", minute: "numeric" , hour12: true })
      }
      </p>
      {unread > 0 && <UnreadBadge unread={unread} />}
    </div>
  </li>
};

export default ConversationListItem;
