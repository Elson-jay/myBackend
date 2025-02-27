import { Test, TestingModule } from '@nestjs/testing';
import { UserpurchaseService } from './userpurchase.service';

describe('UserpurchaseService', () => {
  let service: UserpurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserpurchaseService],
    }).compile();

    service = module.get<UserpurchaseService>(UserpurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
