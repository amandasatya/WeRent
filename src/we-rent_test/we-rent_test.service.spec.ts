import { Test, TestingModule } from '@nestjs/testing';
import { WeRentTestService } from './we-rent_test.service';

describe('WeRentTestService', () => {
  let service: WeRentTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeRentTestService],
    }).compile();

    service = module.get<WeRentTestService>(WeRentTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
