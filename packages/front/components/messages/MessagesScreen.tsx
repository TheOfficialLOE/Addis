import MessagesList from "./MessagesList";
import MessageForm from "./MessageForm";

const MessagesScreen = () => {

  return <div className="h-screen flex flex-col">
    <MessagesList />
    <MessageForm />
  </div>
};

export default MessagesScreen;
