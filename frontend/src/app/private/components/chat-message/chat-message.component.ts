import { Component, Input, OnInit } from '@angular/core';
import { Message, User } from 'src/app/models';
import { AuthService } from 'src/app/public/services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  @Input() message: Message;
  user: User = this.authService.getLoggedInUser();
  constructor(private authService: AuthService) {}
}
