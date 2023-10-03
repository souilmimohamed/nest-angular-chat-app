import { UserEntity } from 'src/user/models';
export declare class ConnectedUserEntity {
    id: number;
    socketId: string;
    user: UserEntity;
}
