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
exports.JoinedRoomEntity = void 0;
const models_1 = require("../../../user/models");
const typeorm_1 = require("typeorm");
const __1 = require("../");
let JoinedRoomEntity = class JoinedRoomEntity {
};
exports.JoinedRoomEntity = JoinedRoomEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JoinedRoomEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JoinedRoomEntity.prototype, "socketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => models_1.UserEntity, (user) => user.joinedRooms),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", models_1.UserEntity)
], JoinedRoomEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.RoomEntity, (room) => room.joinedUsers),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", __1.RoomEntity)
], JoinedRoomEntity.prototype, "room", void 0);
exports.JoinedRoomEntity = JoinedRoomEntity = __decorate([
    (0, typeorm_1.Entity)()
], JoinedRoomEntity);
//# sourceMappingURL=joined-room.entity.js.map