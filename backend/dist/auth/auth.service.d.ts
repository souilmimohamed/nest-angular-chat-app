import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/interfaces/user.interface';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, storedPasswordHash: string): Promise<any>;
    generateJwt(user: User): Promise<string>;
    verifyJwt(jwt: string): Promise<any>;
}
