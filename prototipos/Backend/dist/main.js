"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const cookieParser = require("cookie-parser");
const auth_middleware_1 = require("./auth/auth.middleware");
async function bootstrap() {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.use(cookieParser());
    app.use(new auth_middleware_1.AuthMiddleware().use);
    await app.listen(process.env.PORT || 3000);
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map