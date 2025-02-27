import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/productEntity';
import { CategoryEntity } from 'src/category/entity/CategoryEntity';
import { SubCategoryEntity } from 'src/category/entity/SubCategoryEntity';
import { SupabaseService } from './supabase.service';
import { InventoryEntity } from 'src/inventory/entity/InventoryEntity';
import { PurchaseItemEntity } from 'src/purchase/entity/PurchaseItemEntity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,CategoryEntity,SubCategoryEntity,PurchaseItemEntity])],
  controllers: [ProductController],
  providers: [ProductService,SupabaseService]
})
export class ProductModule {}
