import { Module } from "@nestjs/common";
import {
  GetConversationsController
} from "@api/modules/conversations/usecases/get-conversations/GetConversationsController";
import { ConversationMapper } from "@api/modules/conversations/database/ConversationMapper";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AuthModule } from "@api/modules/auth/AuthModule";
import { SendMessageController } from "@api/modules/conversations/usecases/send-message/SendMessageController";
import { SendMessageUseCaseImpl } from "@api/modules/conversations/usecases/send-message/SendMessageUseCaseImpl";
import {
  CreateConversationController
} from "@api/modules/conversations/usecases/create-conversation/CreateConversationController";
import {
  CreateConversationUseCaseImpl
} from "@api/modules/conversations/usecases/create-conversation/CreateConversationUseCaseImpl";
import { MessageMapper } from "@api/modules/conversations/database/MessageMapper";
import {
  UpdateLastMessageSeenController
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenController";
import {
  UpdateLastMessageSeenUseCaseImpl
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenUseCaseImpl";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AuthModule,
  ],
  controllers: [
    CreateConversationController,
    SendMessageController,
    GetConversationsController,
    UpdateLastMessageSeenController
  ],
  providers: [
    ConversationsRepository,
    ConversationMapper,
    MessageMapper,
    CreateConversationUseCaseImpl,
    SendMessageUseCaseImpl,
    UpdateLastMessageSeenUseCaseImpl
  ]
})
export class ConversationsModule {

}
