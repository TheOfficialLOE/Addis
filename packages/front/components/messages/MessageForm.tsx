import { sendMessageThunk } from "../../store/slices/selectedConversation/selectedConversationThunks";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectConversation } from "../../store/slices/selectedConversation/selectedConversationSlice";

const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const conversation = useAppSelector(selectConversation);
  const dispatch = useAppDispatch();

  return <form className="flex flex-row m-8" onSubmit={(e) => {
    e.preventDefault();
    dispatch(sendMessageThunk({
      conversationId: conversation.id,
      message
    }));
    setMessage("");
  }
  }>
    <input type="text" className="input input-bordered w-full" onChange={(e) => {
      setMessage(e.target.value);
    }
    } value={message}/>
    <button className="btn btn-ghost rounded-full ml-4 px-0 w-12 h-12">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  </form>
};

export default MessageForm
