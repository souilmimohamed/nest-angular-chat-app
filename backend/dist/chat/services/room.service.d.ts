import { RoomEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class RoomService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<RoomEntity>);
    createRoom(room: Room, creator: User): Promise<Room>;
    getRoomsForUser(userId: number, options: IPaginationOptions): Promise<Pagination<Room>>;
    addCreatorToRoom(room: Room, creator: User): Promise<Room>;
    getRoom(roomId: number): Promise<Room>;
}
