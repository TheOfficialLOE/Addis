import { Entity } from "@api/core/base-classes/Entity";
import { UserEntity as User } from "@api/modules/auth/domain/user/UserEntity";

interface MessageEntityProps {
  author: User;
  content: string;
  sentAt: number;
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
        sentAt: Date.now()
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
}
