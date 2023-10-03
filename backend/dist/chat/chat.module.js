"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./gateway/chat.gateway");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("./models");
const room_service_1 = require("./services/room.service");
const models_2 = require("./models");
const connected_user_service_1 = require("./services/connected-user.service");
const joined_room_service_1 = require("./services/joined-room.service");
const message_service_1 = require("./services/message.service");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([
                models_1.RoomEntity,
                models_2.ConnectedUserEntity,
                models_1.MessageEntity,
                models_1.JoinedRoomEntity,
            ]),
        ],
        providers: [
            chat_gateway_1.ChatGateway,
            room_service_1.RoomService,
            connected_user_service_1.ConnectedUserService,
            joined_room_service_1.JoinedRoomService,
            message_service_1.MessageService,
        ],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map