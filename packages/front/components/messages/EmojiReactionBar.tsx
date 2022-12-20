import {
  ReactionBarSelector,
} from "@charkour/react-reactions";

/*
* angry
* sad
* surprise
* happy
* love
* satisfaction
* */

const EmojiReactionBar = (props: { onSelect: (e) => void }) => {
  return <ReactionBarSelector iconSize={28} style={{
    padding: "0.5rem"
  }} onSelect={props.onSelect}/>;
};

export default EmojiReactionBar;
