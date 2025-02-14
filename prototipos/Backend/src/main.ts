import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './auth/auth.middleware';

async function bootstrap() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  const app = await NestFactory.create(AppModule);

  // Middleware de seguridad
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser());

  // Middleware para extraer el token
  app.use(new AuthMiddleware().use);

  await app.listen(process.env.PORT || 3000);
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();