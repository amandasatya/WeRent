import { Test, TestingModule } from '@nestjs/testing';
import { WeRentTestController } from './we-rent_test.controller';
import { WeRentTestService } from './we-rent_test.service';

describe('WeRentTestController', () => {
  let controller: WeRentTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeRentTestController],
      providers: [WeRentTestService],
    }).compile();

    controller = module.get<WeRentTestController>(WeRentTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
