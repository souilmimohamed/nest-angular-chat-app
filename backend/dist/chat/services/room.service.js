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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../models");
const typeorm_2 = require("typeorm");
const Ipagnation_model_1 = require("../../shared/models/Ipagnation.model");
const IpaginationMeta_model_1 = require("../../shared/models/IpaginationMeta.model");
let RoomService = class RoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async createRoom(room, creator) {
        const newRoom = await this.addCreatorToRoom(room, creator);
        return this.roomRepository.save(newRoom);
    }
    async getRoomsForUser(userId, options) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .leftJoin('room.users', 'users')
            .where('users.id = :userId', { userId })
            .leftJoinAndSelect('room.users', 'all_users')
            .orderBy('room.updated_at', 'DESC');
        console.log({ options });
        const meta = new IpaginationMeta_model_1.Meta(await query.getCount(), await query
            .skip(options.limit * options.page)
            .take(options.limit)
            .getCount(), options.limit, Math.ceil((await query.getCount()) / options.limit), options.page);
        return new Ipagnation_model_1.IpaginationResponse(await query
            .skip(options.limit * options.page)
            .take(options.limit)
            .getMany(), meta);
    }
    async addCreatorToRoom(room, creator) {
        room.users.push(creator);
        return room;
    }
    async getRoom(roomId) {
        return this.roomRepository.findOne({
            where: { id: roomId },
            relations: ['users'],
        });
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.RoomEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomService);
//# sourceMappingURL=room.service.js.map