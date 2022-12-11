import { Entity } from "@api/core/base-classes/Entity";
import { MessageEntity as Message } from "@api/modules/conversations/domain/MessageEntity";
import { UserEntity, UserEntity as User } from "@api/modules/auth/domain/user/UserEntity";

interface ConversationEntityProps {
  creator: User;
  recipient: User;
  messages: Message[];
}

interface CreateConversationEntityProps {
  creator: User;
  recipient: User;
}

export class ConversationEntity extends Entity<ConversationEntityProps> {
  public static new(props: CreateConversationEntityProps): ConversationEntity {
    if (props.creator.equals(props.recipient))
      throw "You can't message to yourself!";
    return new ConversationEntity({
      props: {
        ...props,
        messages: []
      }
    });
  }

  get creator(): User {
    return this.props.creator;
  }

  get recipient(): User {
    return this.props.recipient;
  }

  get messages(): Message[] {
    return this.props.messages;
  }

  newMessage(message: Message): void {
    this.messages.push(message);
  }

  markAsReadBy(user: UserEntity) {
    this.props.messages.forEach(message => {
      if (message.author.id !== user.id)
        message.markAsSeen();
    })
  }
}
