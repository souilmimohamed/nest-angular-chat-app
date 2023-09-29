import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../models/room.entity';
import { Repository } from 'typeorm';
import { Room } from '../models/room.interface';
import { User } from 'src/user/models/user.interface';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async createRoom(room: Room, creator: User): Promise<Room> {
    const newRoom = await this.addCreatorToRoom(room, creator);
    return this.roomRepository.save(newRoom);
  }

  async getRoomsForUser(
    userId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<Room>> {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.users', 'user')
      .where('user.id=:userId', { userId });

    return paginate(query, options);
  }

  async addCreatorToRoom(room: Room, creator: User): Promise<Room> {
    room.users.push(creator);
    return room;
  }
}
