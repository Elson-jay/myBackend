import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItemEntity } from './entity/PurchaseItemEntity';
import { PurchaseEntity } from './entity/PurchaseEntity';
import { ProductEntity } from 'src/product/entity/productEntity';
import { InventoryEntity } from 'src/inventory/entity/InventoryEntity';

@Module({
  imports:[TypeOrmModule.forFeature([PurchaseItemEntity,PurchaseEntity,ProductEntity,InventoryEntity])],
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule {}
