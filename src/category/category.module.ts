import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/CategoryEntity';
import { SubCategoryEntity } from './entity/SubCategoryEntity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity,SubCategoryEntity])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
