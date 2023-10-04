import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginReponse, User } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private jwtService: JwtHelperService
  ) {}

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

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }
}
