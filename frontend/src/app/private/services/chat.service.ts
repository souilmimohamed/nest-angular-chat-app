import { Injectable } from '@angular/core';
import { CustomSocket } from 'src/app/socket/custom-socket';
import { RoomPaginate, Room } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Message, MessagePaginate } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: CustomSocket, private snackBar: MatSnackBar) {}

  getMessages(): Observable<MessagePaginate> {
    return this.socket.fromEvent<MessagePaginate>('messages');
  }

  getMyRooms(): Observable<RoomPaginate> {
    return this.socket.fromEvent<RoomPaginate>('rooms');
  }

  emitPaginateRooms(limit: number, page: number) {
    this.socket.emit('paginateRooms', { page, limit });
  }

  createRoom(room: Room) {
    this.socket.emit('createRoom', room);
    this.snackBar.open(`Chat Room ${room.name} created successfully`, 'close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  joinRoom(room: Room) {
    this.socket.emit('joinRoom', room);
  }

  leaveRoom(room: Room) {
    this.socket.emit('leaveRoom', room);
  }

  sendMessage(message: Message) {
    this.socket.emit('addMessage', message);
  }

  getAddedMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('messageAdded');
  }
}
