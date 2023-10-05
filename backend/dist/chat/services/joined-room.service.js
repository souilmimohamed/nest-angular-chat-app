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
exports.JoinedRoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../models");
const typeorm_2 = require("typeorm");
let JoinedRoomService = class JoinedRoomService {
    constructor(joinedRoomRepository) {
        this.joinedRoomRepository = joinedRoomRepository;
    }
    async create(joinedRoom) {
        return this.joinedRoomRepository.save(joinedRoom);
    }
    async findByUser(user) {
        return this.joinedRoomRepository.find({ where: { user } });
    }
    async findByRoom(room) {
        return this.joinedRoomRepository.find({ where: { room: { id: room.id } } });
    }
    async deleteBySocketId(socketId) {
        return this.joinedRoomRepository.delete({ socketId });
    }
    async deleteAll() {
        this.joinedRoomRepository.createQueryBuilder().delete().execute();
    }
};
exports.JoinedRoomService = JoinedRoomService;
exports.JoinedRoomService = JoinedRoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.JoinedRoomEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JoinedRoomService);
//# sourceMappingURL=joined-room.service.js.map