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
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(newUser: User): Observable<User> {
    return this.emailExist(newUser.email).pipe(
      switchMap((exsist: boolean) => {
        if (!exsist) {
          return this.hashPassword(newUser.password).pipe(
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

  login(user: User): Observable<boolean> {
    return this.findByEmail(user.email).pipe(
      switchMap((foundUser: User) => {
        if (foundUser) {
          return this.validatePassword(user.password, foundUser.password).pipe(
            switchMap((matches: boolean) => {
              if (matches) {
                return this.findOne(foundUser.id).pipe(mapTo(true));
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

  private hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
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
}
