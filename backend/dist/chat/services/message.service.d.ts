import { Message, MessageEntity, Room } from '../models';
import { Repository } from 'typeorm';
import { IpaginationResponse } from 'src/shared/models/Ipagnation.model';
import { IpaginationRequest } from 'src/shared/models/IpaginationRequest.model';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<MessageEntity>);
    create(message: Message): Promise<Message>;
    findMessagesForRooms(room: Room, options: IpaginationRequest): Promise<IpaginationResponse<Message>>;
}
