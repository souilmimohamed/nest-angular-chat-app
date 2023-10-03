import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, MessageEntity, Room } from '../models';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(message: Message): Promise<Message> {
    return this.messageRepository.save(this.messageRepository.create(message));
  }

  async findMessagesForRooms(
    room: Room,
    options: IPaginationOptions,
  ): Promise<Pagination<Message>> {
    return paginate(this.messageRepository, options, {
      room,
      relations: ['user', 'room'],
    });
  }
}
