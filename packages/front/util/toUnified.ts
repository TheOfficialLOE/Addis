import { EmojiReaction } from "@api/modules/conversations/domain/MessageEntity";

export const toUnified = (emoji: EmojiReaction): string => {
  switch (emoji) {
    case "angry": {
      return "1f621";
    }
    case "sad": {
      return "1f622";
    }
    case "surprise": {
      return "1f62e";
    }
    case "happy": {
      return "1f606";
    }
    case "love": {
      return "2764-fe0f";
    }
    case "satisfaction": {
      return "1f44d";
    }
    default:
      return null;
  }
}
