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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const models_1 = require("../../../chat/models");
const models_2 = require("../../../chat/models");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
    emailToLowerCase() {
        this.email = this.email?.toLowerCase();
        this.username = this.username?.toLowerCase();
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => models_2.RoomEntity, (room) => room.users),
    __metadata("design:type", Array)
], UserEntity.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => models_1.ConnectedUserEntity, (connection) => connection.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "connections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => models_1.JoinedRoomEntity, (joinedRoom) => joinedRoom.room),
    __metadata("design:type", Array)
], UserEntity.prototype, "joinedRooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => models_1.MessageEntity, (message) => message.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "emailToLowerCase", null);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)()
], UserEntity);
//# sourceMappingURL=user.entity.js.map