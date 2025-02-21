import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/productEntity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository:Repository<ProductEntity>,
    ){}

    async getProduct():Promise<ProductEntity[]>{
        return await this.productRepository.find();
    }
}
