import { Entity } from "@api/core/base-classes/Entity";
import { MessageEntity as Message } from "@api/modules/conversations/domain/MessageEntity";
import { UserEntity as User } from "@api/modules/auth/domain/user/UserEntity";

interface ConversationEntityProps {
  userA: User;
  userB: User;
  messages: Message[];
  lastMessage: Message;
  lastMessageSeenTimeStampUserA: number;
  lastMessageSeenTimeStampUserB: number;
}

interface CreateConversationEntityProps {
  userA: User;
  userB: User;
}

export class ConversationEntity extends Entity<ConversationEntityProps> {
  public static new(props: CreateConversationEntityProps): ConversationEntity {
    if (props.userA.equals(props.userB))
      throw "You can't message to yourself!";
    return new ConversationEntity({
      props: {
        ...props,
        messages: [],
        lastMessage: null,
        lastMessageSeenTimeStampUserA: null,
        lastMessageSeenTimeStampUserB: null
      }
    });
  }

  get userA(): User {
    return this.props.userA;
  }

  get userB(): User {
    return this.props.userB;
  }

  get messages(): Message[] {
    return this.props.messages;
  }

  get lastMessage(): Message {
    return this.props.lastMessage;
  }

  get lastMessageSeenTimeStampUserA(): number {
    return this.props.lastMessageSeenTimeStampUserA;
  }

  get lastMessageSeenTimeStampUserB(): number {
    return this.props.lastMessageSeenTimeStampUserB;
  }

  newMessage(message: Message): void {
    this.props.messages.push(message);
    this.props.lastMessage = message;
  }

  setLastMessageSeenTimeStampForUser(user: User) {
    const now = Date.now();
    if (this.userA.equals(user))
      this.props.lastMessageSeenTimeStampUserA = now;
    else
      this.props.lastMessageSeenTimeStampUserB = now;
  }
}
