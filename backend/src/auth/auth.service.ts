import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from } from 'rxjs';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }

  generateJwt(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
