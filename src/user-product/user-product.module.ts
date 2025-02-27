import { Module } from '@nestjs/common';
import { UserProductController } from './user-product.controller';
import { UserProductService } from './user-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity/productEntity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity])],
  controllers: [UserProductController],
  providers: [UserProductService]
})
export class UserProductModule {}
