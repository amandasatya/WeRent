import { Module } from '@nestjs/common';
import { WeRentService } from './we-rent.service';
import { WeRentController } from './we-rent.controller';

@Module({
  controllers: [WeRentController],
  providers: [WeRentService],
})
export class WeRentModule {}
