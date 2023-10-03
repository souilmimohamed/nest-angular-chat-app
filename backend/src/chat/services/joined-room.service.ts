import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinedRoom, JoinedRoomEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';

@Injectable()
export class JoinedRoomService {
  constructor(
    @InjectRepository(JoinedRoomEntity)
    private readonly joinedRoomRepository: Repository<JoinedRoomEntity>,
  ) {}

  async create(joinedRoom: JoinedRoom): Promise<JoinedRoom> {
    return this.joinedRoomRepository.save(joinedRoom);
  }
  async findByUser(user: User): Promise<JoinedRoom[]> {
    return this.joinedRoomRepository.find({ where: { user } });
  }

  async findByRoom(room: Room): Promise<JoinedRoom[]> {
    return this.joinedRoomRepository.find({ where: { room } });
  }

  async deleteBySocketId(socketId: string) {
    return this.joinedRoomRepository.delete({ socketId });
  }

  async deleteAll() {
    this.joinedRoomRepository.createQueryBuilder().delete().execute();
  }
}
