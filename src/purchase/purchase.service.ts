import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from './entity/PurchaseEntity';
import { DataSource, In, Repository } from 'typeorm';
import { PurchaseDto } from './Dto/PurchaseDto';
import { PurchaseItemEntity } from './entity/PurchaseItemEntity';
import { ProductEntity } from 'src/product/entity/productEntity';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository:Repository<ProductEntity>,
        @InjectRepository(PurchaseEntity)
        private readonly purchaseRepository:Repository<PurchaseEntity>,
        @InjectRepository(PurchaseItemEntity)
        private readonly purchaseItemRepository:Repository<PurchaseItemEntity>,
        private readonly dataSource: DataSource

    ){}

    async addPurchase(purchasedto: PurchaseDto) {
        const productIds = purchasedto.purchase.map(item => item.productId);
    
        const products = await this.productRepository.find({
            where: { id: In(productIds) },
        });
    
        if (products.length === 0) {
            throw new Error("No valid products found for this purchase.");
        }
    
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const totalPrice = purchasedto.purchase.reduce((sum, item) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                return sum + (product.productPrice * item.quantity);
            }, 0);
    
            const newPurchase = this.purchaseRepository.create({
                supplierId: Number(purchasedto.supplierId),
                purchaseDate: purchasedto.purchaseDate,
                paymentMethod: purchasedto.paymentMethod,
                bill: purchasedto.bill,
                totalPrice, 
            });
    
            const purchase = await queryRunner.manager.save(newPurchase,{reload:true});
    
            const purchaseItems = purchasedto.purchase.map((item) => {
                const product = products.find(p => p.id === item.productId);
                return {
                    productId: item.productId,
                    quantity: Number(item.quantity),
                    price: Number(product?.productPrice), 
                    purchaseId:purchase.id,
                };
            });
    
            await queryRunner.manager.save(PurchaseItemEntity,purchaseItems);
    
            await queryRunner.commitTransaction();
            return { message: 'Purchase Added', code: 200 };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Failed to add purchase: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    };

    async getPurchaseList():Promise<PurchaseEntity[]>{
        return await this.purchaseRepository.find()
    }
    
}
