import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Room } from '../../models';
import { Observable } from 'rxjs';
import { MessagePaginate } from 'src/app/models';
import { ChatService } from '../../services/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnChanges, OnDestroy {
  @Input() chatRoom: Room;
  messages$: Observable<MessagePaginate> = this.chatservice.getMessage().pipe(
    map((messagePaginate: MessagePaginate) => {
      const items = messagePaginate.items.sort(
        (a, b) =>
          new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
      );
      messagePaginate.items = items;
      return messagePaginate;
    })
  );
  chatMessage: FormControl = new FormControl(null, Validators.required);
  constructor(private chatservice: ChatService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    this.chatservice.leaveRoom(changes['chatRoom'].previousValue);
    if (this.chatRoom) {
      this.chatservice.joinRoom(this.chatRoom);
    }
  }
  ngOnDestroy(): void {
    this.chatservice.leaveRoom(this.chatRoom);
  }
  sendMessage() {
    this,
      this.chatservice.sendMessage({
        text: this.chatMessage.value,
        room: this.chatRoom,
      });
    this.chatMessage.reset();
  }
}
