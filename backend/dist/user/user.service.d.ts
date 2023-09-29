import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.interface';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/auth.service';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(newUser: User): Promise<User>;
    findAll(options: IPaginationOptions): Promise<Pagination<User>>;
    login(user: User): Promise<string>;
    private emailExist;
    private findOne;
    private findByEmail;
    getOne(id: number): Promise<User>;
    validatePassword(password: string, storedPasswordHash: string): Promise<any>;
    hashPassowrd(password: any): Promise<string>;
    findAllByUsername(username: string): Promise<User[]>;
}
