import { RoomEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';
import { IpaginationRequest } from 'src/shared/models/IpaginationRequest.model';
import { IpaginationResponse } from 'src/shared/models/Ipagnation.model';
export declare class RoomService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<RoomEntity>);
    createRoom(room: Room, creator: User): Promise<Room>;
    getRoomsForUser(userId: number, options: IpaginationRequest): Promise<IpaginationResponse<Room>>;
    addCreatorToRoom(room: Room, creator: User): Promise<Room>;
    getRoom(roomId: number): Promise<Room>;
}
