import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinedRoomEntity, MessageEntity, RoomEntity } from './models';
import { RoomService } from './services/room.service';
import { ConnectedUserEntity } from './models';
import { ConnectedUserService } from './services/connected-user.service';
import { JoinedRoomService } from './services/joined-room.service';
import { MessageService } from './services/message.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([
      RoomEntity,
      ConnectedUserEntity,
      MessageEntity,
      JoinedRoomEntity,
    ]),
  ],
  providers: [
    ChatGateway,
    RoomService,
    ConnectedUserService,
    JoinedRoomService,
    MessageService,
  ],
})
export class ChatModule {}
