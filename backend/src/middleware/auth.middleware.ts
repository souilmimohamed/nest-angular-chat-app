import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/user.service';

export interface RequestModel extends Request {
  user: User;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const tokenArray: string[] = req.headers['authorization'].split(' ');
      const decodeToken = await this.authService.verifyJwt(tokenArray[1]);
      const user = await this.userService.getOne(decodeToken.user.id);
      if (user) {
        req.user = user;
        next();
      } else throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
