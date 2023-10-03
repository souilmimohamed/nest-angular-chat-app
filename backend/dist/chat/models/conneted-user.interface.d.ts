import { User } from 'src/user/models/user.interface';
export interface ConnectUser {
    id?: number;
    socketId?: string;
    user?: User;
}
