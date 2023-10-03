import { ConnectedUserEntity, ConnectUser } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';
export declare class ConnectedUserService {
    private readonly connectedUserRepository;
    constructor(connectedUserRepository: Repository<ConnectedUserEntity>);
    create(connectedUser: ConnectUser): Promise<ConnectUser>;
    findByUser(user: User): Promise<ConnectUser[]>;
    deleteBySocketId(socketId: string): Promise<void>;
    deleteAll(): Promise<void>;
}
