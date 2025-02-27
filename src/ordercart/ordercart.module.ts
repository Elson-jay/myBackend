import { Module } from '@nestjs/common';
import { OrdercartController } from './ordercart.controller';
import { OrdercartService } from './ordercart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCartEntity } from './entity/OrderCartEntity';
import { ProductEntity } from 'src/product/entity/productEntity';
import { InventoryEntity } from 'src/inventory/entity/InventoryEntity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderCartEntity,ProductEntity])],
  controllers: [OrdercartController],
  providers: [OrdercartService]
})
export class OrdercartModule {}
