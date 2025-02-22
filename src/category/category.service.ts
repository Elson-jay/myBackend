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
        const categories = await this.categoryRepository
        .createQueryBuilder("category")
        .leftJoinAndSelect("category.subCategory", "subCategory") 
        .select([
            "category.id",
            "category.categoryname",
            "subCategory.id",
            "subCategory.subcategoryname"
        ])
    .getMany();
return categories;


    };

    async addCategory(categoryDto :CategoryDto){
        const newCategory = this.categoryRepository.create({ categoryname: categoryDto.categoryname });
        const savedCategory = await this.categoryRepository.save(newCategory);
    
        const subcategories = categoryDto.subcategory.map(sub => ({
            subcategoryname: sub.subcategoryname,
            categoryId: savedCategory.id, 
        }));
    
        await this.subCategoryRepository.insert(subcategories);
    
        return { message: "Category and Subcategories added successfully!", code: 200 };

    }
}
