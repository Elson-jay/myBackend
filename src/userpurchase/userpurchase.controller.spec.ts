import { Test, TestingModule } from '@nestjs/testing';
import { UserpurchaseController } from './userpurchase.controller';

describe('UserpurchaseController', () => {
  let controller: UserpurchaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserpurchaseController],
    }).compile();

    controller = module.get<UserpurchaseController>(UserpurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
