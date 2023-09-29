import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CreateRoomComponent } from './components/create-room/create-room.component';

const MAT_MODULES = [
  MatListModule,
  MatPaginatorModule,
  MatCardModule,
  MatButtonModule,
];
@NgModule({
  declarations: [DashboardComponent, CreateRoomComponent],
  imports: [CommonModule, PrivateRoutingModule, ...MAT_MODULES],
})
export class PrivateModule {}
