/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LikeController } from './likes.controller';
import { LikeService } from './likes.service';

@Module({
  imports: [PrismaModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
