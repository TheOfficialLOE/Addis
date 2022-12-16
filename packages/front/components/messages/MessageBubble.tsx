import { Message, SelectedConversation } from "../../store/slices/selectedConversation/types";
import { User } from "../../store/slices/user/userSlice";
import { useState } from "react";
import EmojiReactionBar from "./EmojiReactionBar";

const MessageBubble = (props: {
  user: User,
  conversation: SelectedConversation,
  message: Message
}) => {
  const [showReactionBar, setShowReactBar] = useState<boolean>(false);
  const user = props.user;
  const {
    userA,
    lastMessageSeenTimeStampUserA,
    userB,
    lastMessageSeenTimeStampUserB
  } = props.conversation;

  const {
    id,
    authorId,
    content,
    sentAt
  } = props.message;

  const isUserTheAuthor = authorId === user.id;

  return <div key={id} className={`relative mt-4 ${isUserTheAuthor && "text-right"}`}>
    <div className={`inline-block ${
      isUserTheAuthor ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
    } p-4 rounded-xl`}
         onMouseOver={() => {
           setShowReactBar(true)
         }}
         onMouseOut={() => {
           setShowReactBar(false);
         }}
    >
      {showReactionBar && <div className={`absolute bottom-12 ${isUserTheAuthor ? "right-24" : "left-28"}`}>
        <EmojiReactionBar />
      </div>
      }
      <p>{content}</p>
      {isUserTheAuthor && (
        userA === user.id ? (
          sentAt <= lastMessageSeenTimeStampUserB ?
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checks" width="20"
                 height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 12l5 5l10 -10"></path>
              <path d="M2 12l5 5m5 -5l5 -5"></path>
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20"
                 height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l5 5l10 -10"></path>
            </svg>
        ) : (
          userB === user.id && (
            sentAt <= lastMessageSeenTimeStampUserA ?
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checks" width="20"
                   height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                   stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 12l5 5l10 -10"></path>
                <path d="M2 12l5 5m5 -5l5 -5"></path>
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20"
                   height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                   stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
          )
        )
      )}
      <p>{
        new Date(sentAt)
          .toLocaleString("en-US", { hour: "numeric", minute: "numeric" , hour12: true })
      }
      </p>
    </div>
  </div>
};

export default MessageBubble;
