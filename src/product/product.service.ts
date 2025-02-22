import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/productEntity';
import { ProductDto } from './Dto/product-dto';
import { UpdateProductDto } from './Dto/updateProduct-dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository:Repository<ProductEntity>,
    ){}

    async getProduct():Promise<ProductEntity[]>{
        return await this.productRepository.find();
    }

    async addProduct(productdto:ProductDto){
        if(Object.values(productdto).some(value => value === undefined || value == null || value === '')){
            throw new Error("Fill all the details")
        }
        const newProduct = this.productRepository.create(productdto)
        await this.productRepository.save(newProduct)
        return {
            code:200,
            message:'Product added successfully',
            accessToken:''
        }
    }

    async upDateProduct(updateProductdto:UpdateProductDto){
       const {id, ...updatevalue } = updateProductdto;
       const existingProduct = await this.productRepository.findOne({where:{id}});

       if(!existingProduct){
        throw new NotFoundException(`Product with ID ${id} not found`)
       };

       await this.productRepository.update(id,{
            productName:updatevalue.productName || existingProduct.productName,
            productPrice:updatevalue.productPrice || existingProduct.productPrice,
       })
    }
}
