import { Injectable } from '@nestjs/common';
import { User, LoginUserDto, CreateUserDto } from './models';

@Injectable()
export class UserHelperService {
  createUserDtoToEntity(createUserDto: CreateUserDto): User {
    return {
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
    };
  }
  loginUserDtoToEntity(loginUserDto: LoginUserDto): User {
    return {
      email: loginUserDto.email,
      password: loginUserDto.password,
    };
  }
}
