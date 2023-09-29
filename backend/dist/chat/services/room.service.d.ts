import { RoomEntity } from '../models/room.entity';
import { Repository } from 'typeorm';
import { Room } from '../models/room.interface';
import { User } from 'src/user/models/user.interface';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class RoomService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<RoomEntity>);
    createRoom(room: Room, creator: User): Promise<Room>;
    getRoomsForUser(userId: number, options: IPaginationOptions): Promise<Pagination<Room>>;
    addCreatorToRoom(room: Room, creator: User): Promise<Room>;
}
