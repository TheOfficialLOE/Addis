import { Message, SelectedConversation } from "../../store/slices/selectedConversation/types";
import { User } from "../../store/slices/user/userSlice";
import { useState } from "react";
import EmojiReactionBar from "./EmojiReactionBar";
import { postReaction } from "../../util/api";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { toUnified } from "../../util/toUnified";
import { EmojiReaction } from "@api/modules/conversations/domain/MessageEntity";
import DoubleCheck from "../icons/DoubleCheck";
import Check from "../icons/Check";

const MessageBubble = (props: {
  user: User,
  conversation: SelectedConversation,
  message: Message
}) => {
  const [showReactionBar, setShowReactBar] = useState<boolean>(false);
  const user = props.user;
  const {
    id: conversationId,
    userA,
    lastMessageSeenTimeStampUserA,
    userB,
    lastMessageSeenTimeStampUserB
  } = props.conversation;

  const {
    id: messageId,
    authorId,
    content,
    reaction,
    sentAt
  } = props.message;

  const onEmojiReactionSelect = async (e: string) => {
    await postReaction({
      conversationId,
      messageId: messageId,
      reaction: e
    });
  }

  const isUserTheAuthor = authorId === user.id;

  return <div key={messageId} className={`relative mt-4 ${isUserTheAuthor && "text-right"}`}>
    <div className={`inline-flex flex-col ${
      isUserTheAuthor ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
    } p-4 rounded-xl`}
         onMouseOver={() => {
           setShowReactBar(true)
         }}
         onMouseOut={() => {
           setShowReactBar(false);
         }}
    >
      <div className="inline-flex items-center">
        {showReactionBar && <div className={`absolute bottom-12 ${isUserTheAuthor ? "right-24" : "left-24"}`}>
          <EmojiReactionBar onSelect={onEmojiReactionSelect} />
        </div>
        }
        <p>{content}</p>
        <p className={`${isUserTheAuthor && "mx-2"} ml-4`}>{
          new Date(sentAt)
            .toLocaleString("en-US", { hour: "numeric", minute: "numeric" , hour12: true })
        }
        </p>
        {isUserTheAuthor && (
          userA === user.id ? (
            sentAt <= lastMessageSeenTimeStampUserB ?
              <DoubleCheck /> :
              <Check />
          ) : (
            userB === user.id && (
              sentAt <= lastMessageSeenTimeStampUserA ?
                <DoubleCheck /> :
                <Check />
            )
          )
        )}
      </div>
      <div className="block">
        {reaction && <Emoji
          unified={toUnified(reaction as EmojiReaction)}
          size={18}
          emojiStyle={EmojiStyle.NATIVE}
        />}
      </div>
    </div>
  </div>
};

export default MessageBubble;
