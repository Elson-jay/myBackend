import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItemEntity } from './entity/PurchaseItemEntity';
import { PurchaseEntity } from './entity/PurchaseEntity';

@Module({
  imports:[TypeOrmModule.forFeature([PurchaseItemEntity,PurchaseEntity])],
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule {}
