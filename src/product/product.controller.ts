import { Body, Controller ,Get, Post, UseGuards} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './Dto/product-dto';
import { ProductDeleteDto, UpdateProductDto } from './Dto/updateProduct-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/hooks/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('product')
export class ProductController {
    constructor(
        private readonly productService:ProductService
    ){}

    @Get("/product")
    @ApiBearerAuth('adminBearerAuth')
    @UseGuards(AuthGuard)
    @Roles(1)
    async getProduct(){
        return await this.productService.getProduct()
    }

    @ApiBearerAuth('adminBearerAuth')
    @UseGuards(AuthGuard)
    @Roles(1)
    @Post('/addProduct')
    async addProduct(@Body() productdto:ProductDto){
        return await this.productService.addProduct(productdto)
    }

    @ApiBearerAuth('adminBearerAuth')
    @UseGuards(AuthGuard)
    @Roles(1)
    @Post('/upDateProduct')
    async upDateProduct(@Body() updateproductdto:UpdateProductDto){
        return await this.productService.upDateProduct(updateproductdto)
    }

     @ApiBearerAuth('adminBearerAuth')
     @UseGuards(AuthGuard)
    @Roles(1)
    @Post('/deleteProduct')
    async deleteProduct(@Body() deleteProductdto:ProductDeleteDto){
        return await this.productService.deleteProduct(deleteProductdto)
    }
}
