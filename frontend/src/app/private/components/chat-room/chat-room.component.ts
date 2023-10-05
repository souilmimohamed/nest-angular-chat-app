import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Room } from '../../models';
import { Observable, combineLatest } from 'rxjs';
import { MessagePaginate } from 'src/app/models';
import { ChatService } from '../../services/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnChanges, OnDestroy {
  @Input() chatRoom: Room;
  @ViewChild('messages') private messagesScroller: ElementRef;
  messages$: Observable<MessagePaginate> = combineLatest([
    this.chatservice.getMessages(),
    this.chatservice.getAddedMessage().pipe(startWith(null)),
  ]).pipe(
    map(([messagePaginate, message]) => {
      if (
        message &&
        message.room.id === this.chatRoom.id &&
        !messagePaginate.items.some((m) => m.id === message.id)
      ) {
        messagePaginate.items.push(message);
      }
      const items = messagePaginate.items.sort(
        (a, b) =>
          new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
      );
      messagePaginate.items = items;
      return messagePaginate;
    }),
    tap(() => this.scrollToBottom())
  );

  chatMessage: FormControl = new FormControl(null, [Validators.required]);
  constructor(private chatservice: ChatService) {}

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
    this.chatservice.sendMessage({
      text: this.chatMessage.value,
      room: this.chatRoom,
    });
    this.chatMessage.reset();
  }
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messagesScroller.nativeElement.scrollTop =
          this.messagesScroller.nativeElement.scrollHeight;
      }, 1);
    } catch {}
  }
}
