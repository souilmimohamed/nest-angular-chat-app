"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./models/user.entity");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const auth_service_1 = require("../auth/auth.service");
const bcrypt = require('bcrypt');
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    create(newUser) {
        return this.emailExist(newUser.email).pipe((0, rxjs_1.switchMap)((exsist) => {
            if (!exsist) {
                return this.authService.hashPassword(newUser.password).pipe((0, rxjs_1.switchMap)((passwordHash) => {
                    newUser.password = passwordHash;
                    return (0, rxjs_1.from)(this.userRepository.save(newUser)).pipe((0, rxjs_1.switchMap)((user) => this.findOne(user.id)));
                }));
            }
            else
                throw new common_1.HttpException('Email is already in use', common_1.HttpStatus.CONFLICT);
        }));
    }
    findAll(options) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, options));
    }
    login(user) {
        return this.findByEmail(user.email).pipe((0, rxjs_1.switchMap)((foundUser) => {
            if (foundUser) {
                return this.authService
                    .validatePassword(user.password, foundUser.password)
                    .pipe((0, rxjs_1.switchMap)((matches) => {
                    if (matches) {
                        return this.findOne(foundUser.id).pipe((0, rxjs_1.switchMap)((payload) => this.authService.generateJwt(payload)));
                    }
                    else
                        throw new common_1.HttpException('wrong credentials', common_1.HttpStatus.UNAUTHORIZED);
                }));
            }
            else
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        }));
    }
    emailExist(email) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { email } })).pipe((0, rxjs_1.map)((user) => {
            if (user) {
                return true;
            }
            else
                return false;
        }));
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { id } }));
    }
    findByEmail(email) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'username', 'password'],
        }));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map