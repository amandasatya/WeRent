import { Module } from '@nestjs/common';
import { ProductRatingController } from './product_rating.controller';
import { ProductRatingService } from './product_rating.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
})
export class ProductRatingModule {}
