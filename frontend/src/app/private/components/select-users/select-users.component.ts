import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/public/services/user.service';

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.scss'],
})
export class SelectUsersComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() addUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() removeUser: EventEmitter<User> = new EventEmitter<User>();
  searchUsername = new FormControl();
  filtredUsers: User[] = [];
  selectedUser: User = {};
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.searchUsername.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((username: string) =>
          this.userService
            .findByUsername(username)
            .pipe(tap((users: User[]) => (this.filtredUsers = users)))
        )
      )
      .subscribe();
  }
  addUserToForm() {
    this.addUser.emit(this.selectedUser);
    this.filtredUsers = [];
    this.selectedUser = {};
    this.searchUsername.setValue(null);
  }
  removeUserFromForm(user: User) {
    this.removeUser.emit(user);
  }
  setSelectedUser(user: User) {
    this.selectedUser = user;
  }
  displayFn(user: User) {
    if (user) return user.username;
    else return '';
  }
}
