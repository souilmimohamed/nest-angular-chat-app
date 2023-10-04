import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { RoomPaginate } from '../../models';
import { AuthService } from 'src/app/public/services/auth.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  rooms$: Observable<RoomPaginate> = this.chatService.getMyRooms();
  selectedRoom = null;
  user: User = this.authService.getLoggedInUser();
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.chatService.emitPaginatRooms(10, 0);
  }
  ngAfterViewInit(): void {
    //this.chatService.emitPaginatRooms(10, 0);
  }

  onSelectRoom(event: MatSelectionListChange) {
    this.selectedRoom = event.source.selectedOptions.selected[0].value;
  }
  onPaginateRooms(event: PageEvent) {
    this.chatService.emitPaginatRooms(event.pageSize, event.pageIndex);
  }
}
