import { Module } from '@nestjs/common';
import { UserpurchaseController } from './userpurchase.controller';
import { UserpurchaseService } from './userpurchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPurchaseEntity } from './entity/UserPurchaseEntity';
import { InventoryEntity } from 'src/inventory/entity/InventoryEntity';
import { OrderCartEntity } from 'src/ordercart/entity/OrderCartEntity';

@Module({
  imports:[TypeOrmModule.forFeature([UserPurchaseEntity,InventoryEntity,OrderCartEntity])],
  controllers: [UserpurchaseController],
  providers: [UserpurchaseService]
})
export class UserpurchaseModule {}
