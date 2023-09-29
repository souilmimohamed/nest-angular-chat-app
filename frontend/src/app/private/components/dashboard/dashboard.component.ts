import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  rooms$ = this.chatService.getMyRooms();
  selectedRoom = null;
  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.createRoom();
  }
  ngAfterViewInit(): void {
    this.chatService.emitPaginatRooms(10, 0);
  }

  onSelectRoom(event: MatSelectionListChange) {
    this.selectedRoom = event.source.selectedOptions.selected[0].value;
  }
  onPaginateRooms(event: PageEvent) {
    console.log({ limit: event.pageSize, page: event.pageIndex });
    this.chatService.emitPaginatRooms(event.pageSize, event.pageIndex);
  }
}