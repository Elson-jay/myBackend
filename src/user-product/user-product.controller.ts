import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserProductService } from './user-product.service';


@Controller('user-product')
export class UserProductController {
    constructor(
        private readonly userProductService:UserProductService
    ){}

    @Get('/getUserProduct')
    async getPurchase(){
        return await this.userProductService.getProduct()
    }
}
