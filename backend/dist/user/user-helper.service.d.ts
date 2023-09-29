import { CreateUserDto } from './models/dto/create-user.dto';
import { User } from './models/user.interface';
import { LoginUserDto } from './models/dto/login-user.dto';
export declare class UserHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): User;
    loginUserDtoToEntity(loginUserDto: LoginUserDto): User;
}
