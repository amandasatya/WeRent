import { Test, TestingModule } from '@nestjs/testing';
import { WeRentController } from './we-rent.controller';
import { WeRentService } from './we-rent.service';

describe('WeRentController', () => {
  let controller: WeRentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeRentController],
      providers: [WeRentService],
    }).compile();

    controller = module.get<WeRentController>(WeRentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
