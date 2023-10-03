import { User } from 'src/user/models';
import { Room } from './room.interface';

export interface JoinedRoom {
  id?: number;
  socketId?: string;
  user?: User;
  room?: Room;
}
