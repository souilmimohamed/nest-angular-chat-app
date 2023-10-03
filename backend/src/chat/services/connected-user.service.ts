import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUserEntity, ConnectUser } from '../models';
import { Repository } from 'typeorm';
import { User } from 'src/user/models';

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

  async deleteAll() {
    await this.connectedUserRepository.createQueryBuilder().delete().execute();
  }
}
