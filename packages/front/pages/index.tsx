import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectConversations } from "../store/slices/conversations/conversationsSlice";
import { selectUser } from "../store/slices/user/userSlice";
import {
  selectConversation,
} from "../store/slices/selectedConversation/selectedConversationSlice";
import { fetchConversationsThunk } from "../store/slices/conversations/conversationsThunks";
import {
  fetchConversationThunk,
  sendMessageThunk,
} from "../store/slices/selectedConversation/selectedConversationThunks";
import { fetchUserThunk } from "../store/slices/user/userThunks";
import ScrollableFeed from "react-scrollable-feed";
import { postMarkAsRead } from "../util/api";

/* update the unread messages
* when we open the conversation
* when we receive a message in the open tab*/



const Index = () => {
  const conversations = useAppSelector(selectConversations);
  const conversation = useAppSelector(selectConversation);
  const [message, setMessage] = useState<string>("");
  const [currentConversationId, setCurrentConversationId] = useState<string>("");
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk());
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentConversationId !== "") {
      dispatch(fetchConversationThunk(currentConversationId));
      postMarkAsRead(currentConversationId);
    }
  }, [currentConversationId, dispatch]);

  // useEffect(() => {
    // dispatch(fetchUserThunk());
    // dispatch(fetchConversationsThunk());
  // }, []);

  const clickHandler = async (e) => {
    e.preventDefault();
    dispatch(sendMessageThunk({
      conversationId: conversation.id,
      message
    }));
    setMessage("");
  };

  return <div className="h-screen">
    <div className="grid grid-cols-[min-content_auto] grid-flow-dense h-full">
      <ul className="w-96 bg-neutral p-4">
        {conversations.map(conversation => (
          <li key={conversation.id} className={`btn justify-start w-full h-20 ${
            conversation.id === currentConversationId && "btn-primary"
          }`} onClick={() => {
            setCurrentConversationId(conversation.id);
          }}
          >
            <div className="w-12 h-12 avatar justify-center items-center rounded-xl bg-accent">
              <p className="text-accent-content font-bold">{
                conversation.creator.id === user.id ? conversation.recipient.name[0] : user.name[0]
              }</p>
            </div>
            <div className="ml-4 flex flex-col items-start">
              <p className="text-white font-bold">{
                conversation.creator.id === user.id ? conversation.recipient.name : conversation.creator.name
              }</p>
              <p className="text-sm mt-2">{conversation.lastMessage.content}</p>
            </div>
            <div className="flex flex-col items-end items-end grow">
              <p>8:52 PM</p>
              {conversation.unread > 0 && <div className="badge badge-accent mt-2">
                {conversation.unread}
              </div>
              }
            </div>
          </li>
        ))}
      </ul>
      {currentConversationId &&
        <div className="h-screen flex flex-col">
        <ScrollableFeed>
          <div className="mx-8">
            {currentConversationId && conversation.messages.map(message => {
              return <div key={message.id} className={`mt-4 ${message.authorId === user.id && "text-right"}`}>
                <div className={`inline-block ${
                  message.authorId === user.id ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
                } p-4 rounded-xl`}>
                  <p>{message.content}</p>
                  {message.authorId === user.id && (message.isSeen ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                         height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                         stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 12l5 5l10 -10"></path>
                    <path d="M2 12l5 5m5 -5l5 -5"></path>
                  </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                         height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                         stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>)}
                </div>
              </div>
            })}
          </div>
        </ScrollableFeed>
        {/*<div className="grow overflow-auto">*/}
        {/*<ul className="mr-8 ">*/}
        {/*  {currentConversationId && conversation.messages.map(message => {*/}
        {/*    return <li key={message.id} className={`mt-4 ${message.authorId === user.id && "text-right"}`}>*/}
        {/*      <p className={`inline-block ${*/}
        {/*        message.authorId === user.id ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"*/}
        {/*      } p-4 rounded-xl`}>{message.content}</p>*/}
        {/*    </li>*/}
        {/*  })}*/}
        {/*</ul>*/}
        {/*</div>*/}
        <form className="flex flex-row m-8" onSubmit={clickHandler}>
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
      </div>
      }
    </div>
  </div>
};

export default Index;
