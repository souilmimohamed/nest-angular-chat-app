import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    users: new FormArray([], [Validators.required]),
  });
  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }
  create() {
    if (this.form.valid) {
      this.chatService.createRoom(this.form.getRawValue());
      this.router.navigate(['../dashboard'], {
        relativeTo: this.activatedRoute,
      });
    }
  }
  addUser(userFormControl: FormControl) {
    this.users.push(userFormControl);
  }
  removeUser(userId: number) {
    this.users.removeAt(
      this.users.value.findIndex((user: User) => user.id === userId)
    );
  }
  initUser(user: User) {
    return new FormControl({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }
}
