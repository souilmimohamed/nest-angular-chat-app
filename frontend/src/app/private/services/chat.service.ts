import { Injectable } from '@angular/core';
import { CustomSocket } from 'src/app/socket/custom-socket';
import { RoomPaginate, Room } from '../models/room.interface';
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
    return this.socket.fromEvent<RoomPaginate>('rooms');
  }

  emitPaginatRooms(limit: number, page: number) {
    this.socket.emit('paginateRooms', { limit, page });
  }

  createRoom() {
    //this.socket.emit('createRoom', room);
  }
}
