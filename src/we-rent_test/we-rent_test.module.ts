import { Module } from '@nestjs/common';
import { WeRentTestService } from './we-rent_test.service';
import { WeRentTestController } from './we-rent_test.controller';

@Module({
  controllers: [WeRentTestController],
  providers: [WeRentTestService],
})
export class WeRentTestModule {}
