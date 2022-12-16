
const UnreadBadge = (props: {
  unread: number
}) => {
  return <div className="badge badge-accent mt-2">
    {props.unread}
  </div>
};

export default UnreadBadge;
