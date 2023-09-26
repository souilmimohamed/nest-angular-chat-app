import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    hashPassword(password: string): Observable<string>;
    validatePassword(password: string, storedPasswordHash: string): Observable<any>;
    generateJwt(user: User): Observable<string>;
}
