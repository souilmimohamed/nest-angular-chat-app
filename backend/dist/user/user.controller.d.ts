import { UserService } from './user.service';
import { UserHelperService } from './user-helper.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto, LoginReponse, CreateUserDto, User } from './models';
export declare class UserController {
    private userService;
    private userHelperService;
    constructor(userService: UserService, userHelperService: UserHelperService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(page?: number, limit?: number): Promise<Pagination<User>>;
    login(loginUserDto: LoginUserDto): Promise<LoginReponse>;
    fidAllByUsername(usernane: string): Promise<User[]>;
}
