import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/productEntity';
import { CategoryEntity } from 'src/category/entity/CategoryEntity';
import { SubCategoryEntity } from 'src/category/entity/SubCategoryEntity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,CategoryEntity,SubCategoryEntity])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
