import { CreateUserDto } from './models/dto/create-user.dto';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { LoginUserDto } from './models/dto/login-user.dto';
export declare class UserHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): Observable<User>;
    loginUserDtoToEntity(loginUserDto: LoginUserDto): Observable<User>;
}
