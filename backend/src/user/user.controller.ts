import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable, of, switchMap } from 'rxjs';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserHelperService } from './user-helper.service';
import { User } from './models/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from './models/dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userHelperService: UserHelperService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.userHelperService
      .createUserDtoToEntity(createUserDto)
      .pipe(switchMap((user: User) => this.userService.create(user)));
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll({
      page,
      limit,
      route: 'localhost:5000/users',
    });
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Observable<boolean> {
    return this.userHelperService
      .loginUserDtoToEntity(loginUserDto)
      .pipe(switchMap((user: User) => this.userService.login(user)));
  }
}
