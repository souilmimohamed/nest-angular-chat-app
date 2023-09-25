import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(newUser: User): Observable<User>;
    findAll(options: IPaginationOptions): Observable<Pagination<User>>;
    login(user: User): Observable<boolean>;
    private emailExist;
    private hashPassword;
    private validatePassword;
    private findOne;
    private findByEmail;
}
