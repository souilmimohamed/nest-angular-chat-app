"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('nest-chat-app-backend')
        .setDescription('nest backend for chat app')
        .setVersion('1.0')
        .addBearerAuth({ in: 'header', type: 'http' })
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
        deepScanRoutes: true,
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map