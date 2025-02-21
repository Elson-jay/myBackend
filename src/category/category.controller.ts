import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './Dto/Category-dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Get('/getCategory')
    async getCategory(){
        return await this.categoryService.getCategory();
    }

    @Post('/addCategory')
    async addCategory(@Body() categorydto:CategoryDto){
        return await this.categoryService.addCategory(categorydto)
    }
}
