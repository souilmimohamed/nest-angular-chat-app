import { User } from 'src/app/models/user.interface';
import { Meta } from './meta.interface';

export interface Room {
  id?: number;
  name?: string;
  description?: string;
  users?: User[];
  created_at?: Date;
  updated_at?: Date;
}

export interface RoomPaginate {
  items: Room[];
  meta: Meta;
}
