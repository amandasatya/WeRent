import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
// picture
import { MulterModule } from '@nestjs/platform-express';
import { v4 as uuidv4} from 'uuid';
import { memoryStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
        storage: memoryStorage(),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
