import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/models/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { RoomService } from '../services/room.service';
import { Room, Page, ConnectUser, Message, JoinedRoom } from '../models';
import { ConnectedUserService } from '../services/connected-user.service';
import { JoinedRoomService } from '../services/joined-room.service';
import { MessageService } from '../services/message.service';

@WebSocketGateway({
  cors: {
    origin: [
      'https://hoppscotch.io',
      'http://localhost:5000',
      'http://localhost:4200',
    ],
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private connectedUserService: ConnectedUserService,
    private joinedRoomService: JoinedRoomService,
    private messageService: MessageService,
  ) {}

  async onModuleInit() {
    await this.connectedUserService.deleteAll();
    await this.joinedRoomService.deleteAll();
  }

  @SubscribeMessage('message')
  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(
        socket.handshake.headers.authorization,
      );
      const user: User = await this.userService.getOne(decodedToken.user.id);
      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        const rooms = await this.roomService.getRoomsForUser(user.id, {
          page: 1,
          limit: 10,
        });

        //save connection to database
        await this.connectedUserService.create({ socketId: socket.id, user });
        rooms.meta.currentPage = rooms.meta.currentPage - 1;
        return this.server.to(socket.id).emit('rooms', rooms);
      }
    } catch (error) {
      return this.disconnect(socket);
    }
  }
  async handleDisconnect(socket: Socket) {
    //remove connection from database
    await this.connectedUserService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: Room) {
    const createdRoom = await this.roomService.createRoom(
      room,
      socket.data.user,
    );
    for (const user of createdRoom.users) {
      const connections: ConnectUser[] =
        await this.connectedUserService.findByUser(user);
      const rooms = await this.roomService.getRoomsForUser(user.id, {
        page: 1,
        limit: 10,
      });
      rooms.meta.currentPage = rooms.meta.currentPage - 1;
      for (const connection of connections) {
        await this.server.to(connection.socketId).emit('rooms', rooms);
      }
    }
  }

  @SubscribeMessage('paginateRooms')
  async onPaginateRoom(socket: Socket, page: Page) {
    const rooms = await this.roomService.getRoomsForUser(
      socket.data.user.id,
      this.handleIncomingPageRequest(page),
    );
    // substract page -1 to match the angular material paginator
    rooms.meta.currentPage = rooms.meta.currentPage - 1;
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(socket: Socket, room: Room) {
    const messages = await this.messageService.findMessagesForRooms(room, {
      page: 1,
      limit: 10,
    });
    messages.meta.currentPage = messages.meta.currentPage - 1;
    //save connection to room
    await this.joinedRoomService.create({
      socketId: socket.id,
      user: socket.data.user,
      room,
    });
    //send last messages from room to user
    await this.server.to(socket.id).emit('messages', messages);
  }
  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(socket: Socket) {
    //remove connection from joined room
    this.joinedRoomService.deleteBySocketId(socket.id);
  }

  @SubscribeMessage('addMessage')
  async onAddMessage(socket: Socket, message: Message) {
    const createdMessage: Message = await this.messageService.create({
      ...message,
      user: socket.data.user,
    });
    const room: Room = await this.roomService.getRoom(createdMessage.room.id);
    const joinedUser: JoinedRoom[] =
      await this.joinedRoomService.findByRoom(room);
  }
  private handleIncomingPageRequest(page: Page) {
    page.limit = page.limit > 100 ? 100 : page.limit;
    // add page +1 to match angular material paginator
    page.page = page.page + 1;
    return page;
  }
}
