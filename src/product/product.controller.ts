import { Controller ,Get, Post} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './Dto/product-dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService:ProductService
    ){}

    @Get("/product")
    async getProduct(){
        return await this.productService.getProduct()
    }

    @Post('/addProduct')
    async addProduct(productdto:ProductDto){
        return await this.productService.addProduct(productdto)
    }
}
