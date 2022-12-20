import { Entity } from "@api/core/base-classes/Entity";
import { UserEntity as User } from "@api/modules/auth/domain/user/UserEntity";

export enum EmojiReaction {
  ANGRY = "angry",
  SAD = "sad",
  SURPRISE = "surprise",
  HAPPY = "happy",
  LOVE = "love",
  SATISFACTION = "satisfaction"
}

interface MessageEntityProps {
  author: User;
  content: string;
  sentAt: number;
  reaction?: EmojiReaction;
}

interface CreateMessageEntityProps {
  author: User;
  content: string;
}

export class MessageEntity extends Entity<MessageEntityProps> {
  public static new(props: CreateMessageEntityProps): MessageEntity {
    return new MessageEntity({
      props: {
        ...props,
        sentAt: Date.now(),
      }
    });
  }

  get author(): User {
    return this.props.author;
  }

  get content(): string {
    return this.props.content;
  }

  get sentAt(): number {
    return this.props.sentAt;
  }

  get reaction(): EmojiReaction {
    return this.props.reaction;
  }

  setReaction(reaction: EmojiReaction): void {
    this.props.reaction = reaction;
  }
}
