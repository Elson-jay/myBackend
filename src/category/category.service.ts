import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/CategoryEntity';
import { Repository } from 'typeorm';
import { CategoryDto } from './Dto/Category-dto';
import { SubCategoryEntity } from './entity/SubCategoryEntity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository:Repository<CategoryEntity>,
        @InjectRepository(SubCategoryEntity)
        private readonly subCategoryRepository:Repository<SubCategoryEntity>
    ){}

    async getCategory():Promise<CategoryEntity[]>{
        return await this.categoryRepository.find();
    };

    async addCategory(categoryDto :CategoryDto){
        const newCategory = this.categoryRepository.create({ categoryname: categoryDto.name });
        const savedCategory = await this.categoryRepository.save(newCategory);
    
        const subcategories = categoryDto.subcategory.map(sub => ({
            name: sub.name,
            categoryId: savedCategory.id, 
        }));
    
        await this.subCategoryRepository.insert(subcategories);
    
        return { message: "Category and Subcategories added successfully!", code: 200 };

    }
}
