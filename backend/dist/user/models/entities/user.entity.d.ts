import { ConnectedUserEntity, JoinedRoomEntity, MessageEntity } from 'src/chat/models';
import { RoomEntity } from 'src/chat/models';
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    rooms: RoomEntity[];
    connections: ConnectedUserEntity[];
    joinedRooms: JoinedRoomEntity[];
    messages: MessageEntity[];
    emailToLowerCase(): void;
}
