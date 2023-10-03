import { ConnectedUserEntity } from '../models/connected-user.entity';
import { Repository } from 'typeorm';
import { ConnectUser } from '../models/conneted-user.interface';
import { User } from 'src/user/models/user.interface';
export declare class ConnectedUserService {
    private readonly connectedUserRepository;
    constructor(connectedUserRepository: Repository<ConnectedUserEntity>);
    create(connectedUser: ConnectUser): Promise<ConnectUser>;
    findByUser(user: User): Promise<ConnectUser[]>;
    deleteBySocketId(socketId: string): Promise<void>;
}
