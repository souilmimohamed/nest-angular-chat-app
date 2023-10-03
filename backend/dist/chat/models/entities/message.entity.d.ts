import { UserEntity } from 'src/user/models';
import { RoomEntity } from './room.entity';
export declare class MessageEntity {
    id: number;
    text: string;
    user: UserEntity;
    room: RoomEntity;
    created_at: Date;
    updated_at: Date;
}
