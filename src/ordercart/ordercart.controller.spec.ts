import { Test, TestingModule } from '@nestjs/testing';
import { OrdercartController } from './ordercart.controller';

describe('OrdercartController', () => {
  let controller: OrdercartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdercartController],
    }).compile();

    controller = module.get<OrdercartController>(OrdercartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
