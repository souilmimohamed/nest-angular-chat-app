import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.interface';
import { Page } from '../models/page.interface';
import { ConnectedUserService } from '../services/connected-user.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private userService;
    private roomService;
    private connectedUserService;
    server: Server;
    constructor(authService: AuthService, userService: UserService, roomService: RoomService, connectedUserService: ConnectedUserService);
    handleConnection(socket: Socket): Promise<boolean | void>;
    handleDisconnect(socket: Socket): Promise<void>;
    private disconnect;
    onCreateRoom(socket: Socket, room: Room): Promise<void>;
    onPaginateRoom(socket: Socket, page: Page): Promise<boolean>;
    private handleIncomingPageRequest;
}
