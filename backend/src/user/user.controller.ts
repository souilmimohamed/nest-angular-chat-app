import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserHelperService } from './user-helper.service';
import { User } from './models/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from './models/dto/login-user.dto';
import { LoginReponse } from './models/login-response.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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

  @UseGuards(JwtGuard)
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
  login(@Body() loginUserDto: LoginUserDto): Observable<LoginReponse> {
    return this.userHelperService.loginUserDtoToEntity(loginUserDto).pipe(
      switchMap((user: User) =>
        this.userService.login(user).pipe(
          map((jwt: string) => {
            return {
              access_token: jwt,
              token_type: 'JWT',
              expires_in: 10000,
            };
          }),
        ),
      ),
    );
  }
}
