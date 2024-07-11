/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ProductRatingModule } from './rating/product_rating.module';
import { ReviewModule } from './reviews/review.module';
import { PrismaService } from './prisma/prisma.service';
import { WeRentModule } from './we-rent/we-rent.module';
import { UserProductModule } from './user_product/user_product.module';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProductModule,
    ProductRatingModule,
    UserProductModule,
    ReviewModule,
    ProductModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
    WeRentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
