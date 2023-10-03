import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/models/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
export interface RequestModel extends Request {
    user: User;
}
export declare class AuthMiddleware implements NestMiddleware {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    use(req: RequestModel, res: Response, next: NextFunction): Promise<void>;
}
