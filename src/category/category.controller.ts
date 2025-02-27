import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './Dto/Category-dto';
import { Roles } from 'src/hooks/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Get('/getCategory')
    @UseGuards(AuthGuard)
    @Roles(1)
    async getCategory(){
        return await this.categoryService.getCategory();
    }

    @Post('/addCategory')
    @UseGuards(AuthGuard)
    @Roles(1)
    async addCategory(@Body() categorydto:CategoryDto){
        return await this.categoryService.addCategory(categorydto)
    }
}
