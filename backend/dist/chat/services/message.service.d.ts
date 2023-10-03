import { Message, MessageEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<MessageEntity>);
    create(message: Message): Promise<Message>;
    findMessagesForRooms(room: Room, options: IPaginationOptions): Promise<Pagination<Message>>;
}
