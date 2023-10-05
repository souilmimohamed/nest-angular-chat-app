import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';
import {
  IPaginationOptions,
  Pagination,
  paginate,
  paginateRawAndEntities,
} from 'nestjs-typeorm-paginate';
import { IpaginationRequest } from 'src/shared/models/IpaginationRequest.model';
import { IpaginationResponse } from 'src/shared/models/Ipagnation.model';
import { Meta } from 'src/shared/models/IpaginationMeta.model';

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
    options: IpaginationRequest,
  ): Promise<IpaginationResponse<Room>> {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updated_at', 'DESC');
    const meta = new Meta(
      await query.getCount(),
      await query
        .skip(options.limit * options.page)
        .take(options.limit)
        .getCount(),
      options.limit,
      Math.ceil((await query.getCount()) / options.limit),
      options.page,
    );
    return new IpaginationResponse(
      await query
        .skip(options.limit * options.page)
        .take(options.limit)
        .getMany(),
      meta,
    );
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
