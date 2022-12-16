
const ConversationAvatar = (props: { firstLetter: string }) => {
  return <div className="w-12 h-12 avatar justify-center items-center rounded-xl bg-accent">
    <p className="text-accent-content font-bold">{
      props.firstLetter
    }</p>
  </div>
};

export default ConversationAvatar;
