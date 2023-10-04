import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  constructor() {}

  ngOnInit(): void {}
}
