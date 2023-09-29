import { RoomEntity } from 'src/chat/models/room.entity';
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    rooms: RoomEntity[];
    emailToLowerCase(): void;
}
