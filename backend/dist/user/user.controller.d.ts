import { UserService } from './user.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserHelperService } from './user-helper.service';
import { User } from './models/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from './models/dto/login-user.dto';
import { LoginReponse } from './models/login-response.interface';
export declare class UserController {
    private userService;
    private userHelperService;
    constructor(userService: UserService, userHelperService: UserHelperService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(page?: number, limit?: number): Promise<Pagination<User>>;
    login(loginUserDto: LoginUserDto): Promise<LoginReponse>;
    fidAllByUsername(usernane: string): Promise<User[]>;
}
