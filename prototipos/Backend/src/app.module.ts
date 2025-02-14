import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { LibroModule } from './libro/libro.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Variables de entorno disponibles globalmente
      expandVariables: true, // Permite usar variables de entorno dentro de otras variables
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/Prosefy'),
    AuthModule,
    UsuarioModule,
    LibroModule,
  ],
})
export class AppModule { }