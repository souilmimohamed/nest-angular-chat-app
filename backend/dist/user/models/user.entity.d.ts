import { ConnectedUserEntity } from 'src/chat/models/connected-user.entity';
import { RoomEntity } from 'src/chat/models/room.entity';
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    rooms: RoomEntity[];
    connections: ConnectedUserEntity[];
    emailToLowerCase(): void;
}
