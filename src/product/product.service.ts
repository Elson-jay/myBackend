import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/productEntity';
import { ProductDto } from './Dto/product-dto';
import { ProductDeleteDto, UpdateProductDto } from './Dto/updateProduct-dto';
import { CategoryEntity } from 'src/category/entity/CategoryEntity';
import { SupabaseService } from './supabase.service';
import { InventoryEntity } from 'src/inventory/entity/InventoryEntity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository:Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository:Repository<CategoryEntity>,
        private readonly supabaseService: SupabaseService
    ){}

    async getProduct(){
        const data = await this.productRepository.find({where:{isDelete:false}});
        return {message:'Product Get SuccessFully',data:data,code:200}
    }

    async addProduct(productdto:ProductDto){

        if(Object.values(productdto).some(value => value === undefined || value == null || value === '')){
            throw new BadRequestException("Fill all the details")
        }
        const category = await this.categoryRepository.find()

        const categoryExists = category?.some(cat => 
            cat.id === productdto.catgoryId && 
            cat.subCategory?.some(sub => sub.id === productdto.subCatgoryId) 
        );
        
        if (categoryExists) {
            throw new BadRequestException('Invalid category or subcategory ID');
        }
        
        const supabase = this.supabaseService.getClient();
        const buffer = Buffer.from(productdto.productImage, 'base64');
        const generatedFileName = `images/${Date.now()}.png`;

        const { data, error } = await supabase.storage
            .from('uploads') // Bucket name
            .upload(generatedFileName, buffer, {
                contentType: 'image/png',
            });

        if (error) throw new BadRequestException(`Image upload failed: ${error.message}`);

        const imageUrl = `https://bfqfygdbshnmfelvmcyv.supabase.co/storage/v1/object/public/uploads/${generatedFileName}`;

        const newProduct = this.productRepository.create({...productdto,productImage:imageUrl})
        await this.productRepository.save(newProduct)

        return {
            code:200,
            message:'Product added successfully',
            accessToken:''
        }
    }

    async upDateProduct(updateProductdto:UpdateProductDto){
       const {id, ...updatevalue } = updateProductdto;
       const existingProduct = await this.productRepository.findOne({where:{id,isDelete:false}});

       if(!existingProduct){
        throw new NotFoundException(`Product with ID ${id} not found`)
       };

       const filteredUpdateValues = Object.fromEntries(
        Object.entries(updatevalue).filter(([_, value]) => value !== undefined && value !== '')
    );

    if (Object.keys(filteredUpdateValues).length === 0) {
        throw new BadRequestException('No valid fields provided for update');
    }
       await this.productRepository.update(id,filteredUpdateValues)
    }

    async deleteProduct(productDeletedto:ProductDeleteDto){
        const existingDelete = await this.productRepository.findOne({where:{id:productDeletedto.id}})
        if(existingDelete?.isDelete === true){
            throw new NotFoundException("Product already deleted")
        }
        await this.productRepository.update(productDeletedto.id,{isDelete:true})
    }
}
