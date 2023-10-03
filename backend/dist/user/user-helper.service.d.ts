import { User, LoginUserDto, CreateUserDto } from './models';
export declare class UserHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): User;
    loginUserDtoToEntity(loginUserDto: LoginUserDto): User;
}
