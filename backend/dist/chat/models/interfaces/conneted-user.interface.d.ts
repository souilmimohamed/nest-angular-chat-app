import { User } from 'src/user/models/interfaces/user.interface';
export interface ConnectUser {
    id?: number;
    socketId?: string;
    user?: User;
}
