import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserHelperService } from './user-helper.service';
import { User } from './models/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from './models/dto/login-user.dto';
export declare class UserController {
    private userService;
    private userHelperService;
    constructor(userService: UserService, userHelperService: UserHelperService);
    create(createUserDto: CreateUserDto): Observable<User>;
    findAll(page?: number, limit?: number): Observable<Pagination<User>>;
    login(loginUserDto: LoginUserDto): Observable<boolean>;
}
