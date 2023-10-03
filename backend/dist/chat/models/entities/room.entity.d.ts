import { UserEntity } from 'src/user/models';
import { JoinedRoomEntity, MessageEntity } from '..';
export declare class RoomEntity {
    id: number;
    name: string;
    description: string;
    joinedUsers: JoinedRoomEntity[];
    messages: MessageEntity[];
    users: UserEntity[];
    created_at: Date;
    updated_at: Date;
}
