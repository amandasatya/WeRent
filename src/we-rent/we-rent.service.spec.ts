import { Test, TestingModule } from '@nestjs/testing';
import { WeRentService } from './we-rent.service';

describe('WeRentService', () => {
  let service: WeRentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeRentService],
    }).compile();

    service = module.get<WeRentService>(WeRentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
