import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, MessageEntity, Room } from '../models';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { IpaginationResponse } from 'src/shared/models/Ipagnation.model';
import { Meta } from 'src/shared/models/IpaginationMeta.model';
import { IpaginationRequest } from 'src/shared/models/IpaginationRequest.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(message: Message): Promise<Message> {
    return this.messageRepository.save(this.messageRepository.create(message));
  }

  // async findMessagesForRooms(
  //   room: Room,
  //   options: IPaginationOptions,
  // ): Promise<Pagination<Message>> {
  //   const query = this.messageRepository
  //     .createQueryBuilder('message')
  //     .leftJoin('message.room', 'room')
  //     .where('room.id = :roomId', { roomId: room.id })
  //     .leftJoinAndSelect('message.user', 'user')
  //     .orderBy('message.created_at', 'DESC');

  //   return paginate(query, options);
  // }

  async findMessagesForRooms(
    room: Room,
    options: IpaginationRequest,
  ): Promise<IpaginationResponse<Message>> {
    const query = this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.room', 'room')
      .where('room.id = :roomId', { roomId: room.id })
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('message.created_at', 'DESC');
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
}
