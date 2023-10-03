import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Like, Repository } from 'typeorm';
import { User } from './models/user.interface';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/auth.service';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async create(newUser: User): Promise<User> {
    try {
      const exsist: boolean = await this.emailExist(newUser.email);
      if (!exsist) {
        const passwordHash = await this.hashPassowrd(newUser.password);
        newUser.password = passwordHash;
        const user = await this.userRepository.save(
          this.userRepository.create(newUser),
        );
        return this.findOne(user.id);
      } else {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
    } catch (error) {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }
  }
  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<UserEntity>(this.userRepository, options);
  }

  async login(user: User): Promise<string> {
    try {
      const foundUser = await this.findByEmail(user.email.toLocaleLowerCase());
      if (foundUser) {
        const matches = await this.validatePassword(
          user.password,
          foundUser.password,
        );
        if (matches) {
          const payload: User = await this.findOne(foundUser.id);
          return this.authService.generateJwt(payload);
        } else throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  private async emailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) return true;
    else return false;
  }
  private async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  private async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'username', 'password'],
    });
  }

  public async getOne(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  async hashPassowrd(password): Promise<string> {
    return this.authService.hashPassword(password);
  }

  async findAllByUsername(username: string): Promise<User[]> {
    return this.userRepository.find({
      where: { username: Like(`%${username.toLowerCase()}%`) },
    });
  }
}
