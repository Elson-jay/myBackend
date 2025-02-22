import { Body, Controller ,Get, Post} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './Dto/product-dto';
import { ProductDeleteDto, UpdateProductDto } from './Dto/updateProduct-dto';

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
    async addProduct(@Body() productdto:ProductDto){
        return await this.productService.addProduct(productdto)
    }
    @Post('/upDateProduct')
    async upDateProduct(@Body() updateproductdto:UpdateProductDto){
        return await this.productService.upDateProduct(updateproductdto)
    }

    @Post('/deleteProduct')
    async deleteProduct(@Body() deleteProductdto:ProductDeleteDto){
        return await this.productService.deleteProduct(deleteProductdto)
    }
}
