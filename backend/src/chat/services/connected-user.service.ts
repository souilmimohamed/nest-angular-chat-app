import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUserEntity } from '../models/connected-user.entity';
import { Repository } from 'typeorm';
import { ConnectUser } from '../models/conneted-user.interface';
import { User } from 'src/user/models/user.interface';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUserEntity)
    private readonly connectedUserRepository: Repository<ConnectedUserEntity>,
  ) {}

  async create(connectedUser: ConnectUser): Promise<ConnectUser> {
    return this.connectedUserRepository.save(connectedUser);
  }

  async findByUser(user: User): Promise<ConnectUser[]> {
    return this.connectedUserRepository.find({ where: { user } });
  }

  async deleteBySocketId(socketId: string) {
    this.connectedUserRepository.delete({ socketId });
  }
}
