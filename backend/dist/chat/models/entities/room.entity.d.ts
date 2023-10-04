import { UserEntity } from 'src/user/models';
import { JoinedRoomEntity, MessageEntity } from '..';
export declare class RoomEntity {
    id: number;
    name: string;
    description: string;
    users: UserEntity[];
    joinedUsers: JoinedRoomEntity[];
    messages: MessageEntity[];
    created_at: Date;
    updated_at: Date;
}
