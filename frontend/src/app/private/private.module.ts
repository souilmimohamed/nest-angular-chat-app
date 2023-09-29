import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SelectUsersComponent } from './components/select-users/select-users.component';

const MAT_MODULES = [
  MatListModule,
  MatPaginatorModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatListModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
];
@NgModule({
  declarations: [DashboardComponent, CreateRoomComponent, SelectUsersComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ReactiveFormsModule,
    ...MAT_MODULES,
  ],
})
export class PrivateModule {}
