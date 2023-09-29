import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.interface';
import { Page } from '../models/page.interface';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private userService;
    private roomService;
    server: Server;
    constructor(authService: AuthService, userService: UserService, roomService: RoomService);
    handleConnection(socket: Socket): Promise<boolean | void>;
    handleDisconnect(socket: Socket): void;
    private disconnect;
    onCreateRoom(socket: Socket, room: Room): Promise<Room>;
    onPaginateRoom(socket: Socket, page: Page): Promise<boolean>;
    private handleIncomingPageRequest;
}
