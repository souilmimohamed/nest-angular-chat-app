import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserHelperService } from './user-helper.service';
import { User } from './models/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from './models/dto/login-user.dto';
import { LoginReponse } from './models/login-response.interface';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userHelperService: UserHelperService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const userEntity: User =
      this.userHelperService.createUserDtoToEntity(createUserDto);
    return this.userService.create(userEntity);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll({
      page,
      limit,
      route: 'localhost:5000/users',
    });
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginReponse> {
    const userEntity: User =
      this.userHelperService.loginUserDtoToEntity(loginUserDto);
    const jwt: string = await this.userService.login(userEntity);
    return {
      access_token: jwt,
      expires_in: 10000,
      token_type: 'JWT',
    };
  }
  @Get('/find-by-username')
  async fidAllByUsername(@Query('username') usernane: string): Promise<User[]> {
    return this.userService.findAllByUsername(usernane);
  }
}
