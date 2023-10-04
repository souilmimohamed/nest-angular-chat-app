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
const connected_user_service_1 = require("../services/connected-user.service");
const joined_room_service_1 = require("../services/joined-room.service");
const message_service_1 = require("../services/message.service");
let ChatGateway = class ChatGateway {
    constructor(authService, userService, roomService, connectedUserService, joinedRoomService, messageService) {
        this.authService = authService;
        this.userService = userService;
        this.roomService = roomService;
        this.connectedUserService = connectedUserService;
        this.joinedRoomService = joinedRoomService;
        this.messageService = messageService;
    }
    async onModuleInit() {
        await this.connectedUserService.deleteAll();
        await this.joinedRoomService.deleteAll();
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
                await this.connectedUserService.create({ socketId: socket.id, user });
                rooms.meta.currentPage = rooms.meta.currentPage - 1;
                return this.server.to(socket.id).emit('rooms', rooms);
            }
        }
        catch (error) {
            return this.disconnect(socket);
        }
    }
    async handleDisconnect(socket) {
        await this.connectedUserService.deleteBySocketId(socket.id);
        socket.disconnect();
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
    async onCreateRoom(socket, room) {
        const createdRoom = await this.roomService.createRoom(room, socket.data.user);
        for (const user of createdRoom.users) {
            const connections = await this.connectedUserService.findByUser(user);
            const rooms = await this.roomService.getRoomsForUser(user.id, {
                page: 1,
                limit: 10,
            });
            rooms.meta.currentPage = rooms.meta.currentPage - 1;
            for (const connection of connections) {
                await this.server.to(connection.socketId).emit('rooms', rooms);
            }
        }
    }
    async onPaginateRoom(socket, page) {
        const rooms = await this.roomService.getRoomsForUser(socket.data.user.id, this.handleIncomingPageRequest(page));
        rooms.meta.currentPage = rooms.meta.currentPage - 1;
        return this.server.to(socket.id).emit('rooms', rooms);
    }
    async onJoinRoom(socket, room) {
        const messages = await this.messageService.findMessagesForRooms(room, {
            page: 1,
            limit: 10,
        });
        messages.meta.currentPage = messages.meta.currentPage - 1;
        await this.joinedRoomService.create({
            socketId: socket.id,
            user: socket.data.user,
            room,
        });
        await this.server.to(socket.id).emit('messages', messages);
    }
    async onLeaveRoom(socket) {
        this.joinedRoomService.deleteBySocketId(socket.id);
    }
    async onAddMessage(socket, message) {
        const createdMessage = await this.messageService.create({
            ...message,
            user: socket.data.user,
        });
        const room = await this.roomService.getRoom(createdMessage.room.id);
        const joinedUsers = await this.joinedRoomService.findByRoom(room);
        for (const user of joinedUsers) {
            await this.server.to(user.socketId).emit('messageAdded', createdMessage);
        }
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
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('addMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onAddMessage", null);
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
        room_service_1.RoomService,
        connected_user_service_1.ConnectedUserService,
        joined_room_service_1.JoinedRoomService,
        message_service_1.MessageService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map