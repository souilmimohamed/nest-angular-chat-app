import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private userService;
    server: Server;
    title: string[];
    constructor(authService: AuthService, userService: UserService);
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    private disconnect;
}
