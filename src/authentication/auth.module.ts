import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt_auth.guard';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [ AuthController ],
  exports: [AuthService],
})
export class AuthModule {}
