import dynamic from "next/dynamic";
import { Theme, SuggestionMode, EmojiClickData, EmojiStyle } from "emoji-picker-react";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react")
  }, { ssr: false }
);

const EmojiPicker = (props: {
  onEmojiClick: (e: EmojiClickData) => void;
}) => {
  return <div className="absolute top-52 right-14">
    <Picker
      theme={Theme.DARK}
      emojiStyle={EmojiStyle.NATIVE}
      lazyLoadEmojis={true}
      suggestedEmojisMode={SuggestionMode.RECENT}
      onEmojiClick={props.onEmojiClick}
    />
  </div>
};

export default EmojiPicker;
