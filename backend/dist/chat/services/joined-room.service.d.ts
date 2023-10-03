import { JoinedRoom, JoinedRoomEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';
export declare class JoinedRoomService {
    private readonly joinedRoomRepository;
    constructor(joinedRoomRepository: Repository<JoinedRoomEntity>);
    create(joinedRoom: JoinedRoom): Promise<JoinedRoom>;
    findByUser(user: User): Promise<JoinedRoom[]>;
    findByRoom(room: Room): Promise<JoinedRoom[]>;
    deleteBySocketId(socketId: string): Promise<import("typeorm").DeleteResult>;
    deleteAll(): Promise<void>;
}
