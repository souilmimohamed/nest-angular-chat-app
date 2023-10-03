import { UserEntity } from 'src/user/models/user.entity';
export declare class ConnectedUserEntity {
    id: number;
    socketId: string;
    user: UserEntity;
}
