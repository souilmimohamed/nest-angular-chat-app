import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  register(user: User): Observable<User> {
    return this.http.post<User>('api/users', user).pipe(
      tap((createdUser: User) =>
        this.snackBar.open(
          `User ${user.username} created succesfuly.`,
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        )
      ),
      catchError((e) => {
        this.snackBar.open(
          `User could not be created: ${e.error.message}`,
          'close',
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        return throwError(e);
      })
    );
  }

  findByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(
      `api/users/find-by-username?username=${username}`
    );
  }
}
