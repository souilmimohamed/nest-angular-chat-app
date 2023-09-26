import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/auth.service';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(newUser: User): Observable<User>;
    findAll(options: IPaginationOptions): Observable<Pagination<User>>;
    login(user: User): Observable<string>;
    private emailExist;
    private findOne;
    private findByEmail;
}
