import { Entity } from "@api/core/base-classes/Entity";
import { UserEntity as User } from "@api/modules/auth/domain/user/UserEntity";

interface MessageEntityProps {
  author: User;
  content: string;
  isSeen: boolean;
  sentAt: number;
}

interface CreateMessageEntityProps {
  author: User;
  content: string;
}

export class MessageEntity extends Entity<MessageEntityProps> {
  public static new(props: CreateMessageEntityProps): MessageEntity {
    const sentAt = Date.now();
    return new MessageEntity({
      props: {
        ...props,
        isSeen: false,
        sentAt
      }
    });
  }

  get author(): User {
    return this.props.author;
  }

  get content(): string {
    return this.props.content;
  }

  get isSeen(): boolean {
    return this.props.isSeen;
  }

  get sentAt(): number {
    return this.props.sentAt;
  }

  markAsSeen(): void {
    this.props.isSeen = true;
  }
}
