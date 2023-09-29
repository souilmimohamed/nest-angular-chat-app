import { Injectable } from '@angular/core';
import { CustomSocket } from 'src/app/socket/custom-socket';
import { RommPaginate, Room } from '../models/room.interface';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: CustomSocket) {}

  sendMessage() {}

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getMyRooms() {
    return this.socket.fromEvent<RommPaginate>('rooms');
  }

  createRoom() {
    const user2: User = {
      id: 2,
    };
    const room: Room = {
      name: 'testRoom',
      users: [user2],
    };

    this.socket.emit('createRoom', room);
  }
}
