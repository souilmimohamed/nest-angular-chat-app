import { UserEntity, User } from './models';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { IpaginationRequest } from 'src/shared/models/IpaginationRequest.model';
import { IpaginationResponse } from 'src/shared/models/Ipagnation.model';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(newUser: User): Promise<User>;
    findAll(options: IpaginationRequest): Promise<IpaginationResponse<User>>;
    login(user: User): Promise<string>;
    private emailExist;
    private findOne;
    private findByEmail;
    getOne(id: number): Promise<User>;
    validatePassword(password: string, storedPasswordHash: string): Promise<any>;
    hashPassowrd(password: any): Promise<string>;
    findAllByUsername(username: string): Promise<User[]>;
}
