import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { Observable, from, map, mapTo, switchMap } from 'rxjs';
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

  create(newUser: User): Observable<User> {
    return this.emailExist(newUser.email).pipe(
      switchMap((exsist: boolean) => {
        if (!exsist) {
          return this.authService.hashPassword(newUser.password).pipe(
            switchMap((passwordHash: string) => {
              newUser.password = passwordHash;
              return from(this.userRepository.save(newUser)).pipe(
                switchMap((user: User) => this.findOne(user.id)),
              );
            }),
          );
        } else
          throw new HttpException(
            'Email is already in use',
            HttpStatus.CONFLICT,
          );
      }),
    );
  }
  findAll(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<UserEntity>(this.userRepository, options));
  }

  login(user: User): Observable<string> {
    return this.findByEmail(user.email).pipe(
      switchMap((foundUser: User) => {
        if (foundUser) {
          return this.authService
            .validatePassword(user.password, foundUser.password)
            .pipe(
              switchMap((matches: boolean) => {
                if (matches) {
                  return this.findOne(foundUser.id).pipe(
                    switchMap((payload: User) =>
                      this.authService.generateJwt(payload),
                    ),
                  );
                } else
                  throw new HttpException(
                    'wrong credentials',
                    HttpStatus.UNAUTHORIZED,
                  );
              }),
            );
        } else throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  private emailExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      map((user: User) => {
        if (user) {
          return true;
        } else return false;
      }),
    );
  }
  private findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne({ where: { id } }));
  }

  private findByEmail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'username', 'password'],
      }),
    );
  }

  public getOne(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }
}
