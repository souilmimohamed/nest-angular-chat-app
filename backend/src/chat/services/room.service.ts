import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { find } from 'rxjs';

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
      .leftJoin('room.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updated_at', 'DESC');
    console.log({ options });
    return paginate<RoomEntity>(query, options);
  }

  async addCreatorToRoom(room: Room, creator: User): Promise<Room> {
    room.users.push(creator);
    return room;
  }

  async getRoom(roomId: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['users'],
    });
  }
}
