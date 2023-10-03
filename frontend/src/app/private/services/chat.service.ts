import { Injectable } from '@angular/core';
import { CustomSocket } from 'src/app/socket/custom-socket';
import { RoomPaginate, Room } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: CustomSocket, private snackBar: MatSnackBar) {}

  sendMessage() {}

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getMyRooms(): Observable<RoomPaginate> {
    return this.socket.fromEvent<RoomPaginate>('rooms');
  }

  emitPaginatRooms(limit: number, page: number) {
    this.socket.emit('paginateRooms', { limit, page });
  }

  createRoom(room: Room) {
    this.socket.emit('createRoom', room);
    this.snackBar.open(`Chat Room ${room.name} created successfully`, 'close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
