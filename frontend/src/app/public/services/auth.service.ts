import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginReponse } from 'src/app/models/login-response.interface';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  login(user: User): Observable<LoginReponse> {
    return this.http.post<LoginReponse>('api/users/login', user).pipe(
      tap((res: LoginReponse) =>
        localStorage.setItem('token', res.access_token)
      ),
      tap(() =>
        this.snackBar.open(`Login Succesful`, 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      )
    );
  }
}
