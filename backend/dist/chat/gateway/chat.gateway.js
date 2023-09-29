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
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../auth/auth.service");
const user_service_1 = require("../../user/user.service");
const room_service_1 = require("../services/room.service");
let ChatGateway = class ChatGateway {
    constructor(authService, userService, roomService) {
        this.authService = authService;
        this.userService = userService;
        this.roomService = roomService;
    }
    async handleConnection(socket) {
        try {
            const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
            const user = await this.userService.getOne(decodedToken.user.id);
            if (!user) {
                return this.disconnect(socket);
            }
            else {
                socket.data.user = user;
                const rooms = await this.roomService.getRoomsForUser(user.id, {
                    page: 1,
                    limit: 10,
                });
                rooms.meta.currentPage = rooms.meta.currentPage - 1;
                return this.server.to(socket.id).emit('rooms', rooms);
            }
        }
        catch (error) {
            return this.disconnect(socket);
        }
    }
    handleDisconnect(socket) {
        socket.disconnect();
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
    async onCreateRoom(socket, room) {
        return this.roomService.createRoom(room, socket.data.user);
    }
    async onPaginateRoom(socket, page) {
        const rooms = await this.roomService.getRoomsForUser(socket.data.user.id, this.handleIncomingPageRequest(page));
        rooms.meta.currentPage = rooms.meta.currentPage - 1;
        return this.server.to(socket.id).emit('rooms', rooms);
    }
    handleIncomingPageRequest(page) {
        page.limit = page.limit > 100 ? 100 : page.limit;
        page.page = page.page + 1;
        return page;
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onCreateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('paginateRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onPaginateRoom", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: [
                'https://hoppscotch.io',
                'http://localhost:5000',
                'http://localhost:4200',
            ],
        },
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        room_service_1.RoomService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map