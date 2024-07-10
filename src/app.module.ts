import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ProductRatingModule } from './rating/product_rating.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProductModule,
    ProductRatingModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
