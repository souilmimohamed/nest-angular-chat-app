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
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const auth_service_1 = require("../auth/auth.service");
const bcrypt = require('bcrypt');
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async create(newUser) {
        try {
            const exsist = await this.emailExist(newUser.email);
            if (!exsist) {
                const passwordHash = await this.hashPassowrd(newUser.password);
                newUser.password = passwordHash;
                const user = await this.userRepository.save(this.userRepository.create(newUser));
                return this.findOne(user.id);
            }
            else {
                throw new common_1.HttpException('Email is already in use', common_1.HttpStatus.CONFLICT);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Email is already in use', common_1.HttpStatus.CONFLICT);
        }
    }
    async findAll(options) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, options);
    }
    async login(user) {
        try {
            const foundUser = await this.findByEmail(user.email.toLocaleLowerCase());
            if (foundUser) {
                const matches = await this.validatePassword(user.password, foundUser.password);
                if (matches) {
                    const payload = await this.findOne(foundUser.id);
                    return this.authService.generateJwt(payload);
                }
                else
                    throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            else
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async emailExist(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user)
            return true;
        else
            return false;
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'username', 'password'],
        });
    }
    async getOne(id) {
        return this.userRepository.findOneByOrFail({ id });
    }
    async validatePassword(password, storedPasswordHash) {
        return this.authService.comparePasswords(password, storedPasswordHash);
    }
    async hashPassowrd(password) {
        return this.authService.hashPassword(password);
    }
    async findAllByUsername(username) {
        return this.userRepository.find({
            where: { username: (0, typeorm_2.Like)(`%${username.toLowerCase()}%`) },
        });
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