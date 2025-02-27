import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from './entity/PurchaseEntity';
import { DataSource, In, Repository } from 'typeorm';
import { PurchaseDto } from './Dto/PurchaseDto';
import { PurchaseItemEntity } from './entity/PurchaseItemEntity';
import { ProductEntity } from 'src/product/entity/productEntity';
import { InventoryEntity } from 'src/inventory/entity/InventoryEntity';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(PurchaseEntity)
        private readonly purchaseRepository: Repository<PurchaseEntity>,
        @InjectRepository(PurchaseItemEntity)
        private readonly purchaseItemRepository: Repository<PurchaseItemEntity>,
        @InjectRepository(InventoryEntity)
        private readonly inventoryRepository: Repository<InventoryEntity>,
        private readonly dataSource: DataSource

    ) { }

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

            const purchase = await queryRunner.manager.save(PurchaseEntity, newPurchase);

            const purchaseItems = purchasedto.purchase.map((item) => {
                const product = products.find(p => p.id === item.productId);

                return {
                    productId: item.productId,
                    quantity: Number(item.quantity),
                    price: Number(product?.productPrice),
                    purchaseId: purchase.id,
                };
            });

            await queryRunner.manager.save(PurchaseItemEntity, purchaseItems);

            for (const item of purchaseItems) {
                const existingInventory = await queryRunner.manager.findOne(InventoryEntity, {
                    where: { productId: item.productId },
                });
              
                if (existingInventory) {
                    existingInventory.quantity += item.quantity;
                    await this.inventoryRepository.update({id:existingInventory.id},{quantity:existingInventory.quantity});
                } else {
                    const newInventory = queryRunner.manager.create(InventoryEntity, {
                        productId: item.productId,
                        statusId: 1,
                        quantity: item.quantity
                    });
                    await queryRunner.manager.save(InventoryEntity, newInventory);
                }
            }
      
            await queryRunner.commitTransaction();
            return { message: 'Purchase Added', code: 200 };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Failed to add purchase: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    };

    async getPurchaseList(): Promise<any[]> {
        const purchases = await this.purchaseRepository.find({
            relations: ['purchaseItems', 'purchaseItems.product'],
        });

        return purchases.map(purchase => ({
            id: purchase.id,
            supplierId: purchase.supplierId,
            purchaseDate: purchase.purchaseDate,
            totalPrice: purchase.totalPrice,
            paymentMethod: purchase.paymentMethod,
            bill: purchase.bill,
            purchaseItems: purchase.purchaseItems.map(item => ({
                id: item.id,
                purchaseId: item.purchaseId,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                productName: item.product.productName,
                productPrice: item.product.productPrice,
                categoryId: item.product.catgoryId,
                subCategoryId: item.product.subCatgoryId,
                productImage: item.product.productImage,
                threshold: item.product.Threshold,
                isDelete: item.product.isDelete,
            }))
        }));
    }


}
