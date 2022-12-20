import { useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { selectConversation } from "../../store/slices/selectedConversation/selectedConversationSlice";
import EmojiPicker from "./EmojiPicker";
import Send from "../icons/Send";
import { postMessage } from "../../util/api";

const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const conversation = useAppSelector(selectConversation);

  return <form className="flex flex-row m-8" onSubmit={(e) => {
    e.preventDefault();
    setShowEmojiPicker(false);
    postMessage({
      conversationId: conversation.id,
      message
    })
    setMessage("");
  }
  }>
    <input type="text" className="input input-bordered w-full" onChange={(e) => {
      setMessage(e.target.value);
    }
    } value={message}/>
    <div className="btn btn-ghost rounded-full ml-4 px-0 w-12 h-12" onClick={() => {
      setShowEmojiPicker(!showEmojiPicker);
    }
    }>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-neutral" width="20"
           height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
           stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="12" r="9"></circle>
        <line x1="9" y1="10" x2="9.01" y2="10"></line>
        <line x1="15" y1="10" x2="15.01" y2="10"></line>
      </svg>
    </div>
    {showEmojiPicker && <EmojiPicker onEmojiClick={(e) => {
      setMessage(message + e.emoji)
    }
    } />}
    <button className="btn btn-ghost rounded-full ml-4 px-0 w-12 h-12">
      <Send />
    </button>
  </form>
};

export default MessageForm
