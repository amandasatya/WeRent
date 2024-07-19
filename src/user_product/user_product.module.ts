/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UserProductService } from './user_product.service';
import { UserProductController } from './user_product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserProductController],
  providers: [UserProductService],
})
export class UserProductModule {}
