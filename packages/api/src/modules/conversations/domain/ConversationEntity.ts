import { Entity } from "@api/core/base-classes/Entity";
import { MessageEntity as Message } from "@api/modules/conversations/domain/MessageEntity";
import { UserEntity as User } from "@api/modules/auth/domain/user/UserEntity";

interface ConversationEntityProps {
  userA: User;
  userB: User;
  messages: Message[];
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
        messages: []
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

  newMessage(message: Message): void {
    this.messages.push(message);
  }
}
