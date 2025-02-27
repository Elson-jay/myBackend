import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity/productEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository:Repository<ProductEntity>,
    ){}

    async getProduct(){
        const data = await this.productRepository.find();
        return {message:'get Product', code:200, data:data}
    }
}
