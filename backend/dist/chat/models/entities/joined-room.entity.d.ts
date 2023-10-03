import { UserEntity } from 'src/user/models';
import { RoomEntity } from '../';
export declare class JoinedRoomEntity {
    id: number;
    socketId: string;
    user: UserEntity;
    room: RoomEntity;
}
