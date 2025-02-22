import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from './entity/PurchaseEntity';
import { DataSource, Repository } from 'typeorm';
import { PurchaseDto } from './Dto/PurchaseDto';
import { PurchaseItemEntity } from './entity/PurchaseItemEntity';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(PurchaseEntity)
        private readonly purchaseRepository:Repository<PurchaseEntity>,
        @InjectRepository(PurchaseEntity)
        private readonly purchaseItemRepository:Repository<PurchaseItemEntity>,
        private readonly dataSource: DataSource

    ){}

    async addPurchase(purchasedto:PurchaseDto){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const newPurchase = this.purchaseRepository.create({
                supplierId: purchasedto.supplierId,
                purchaseDate: purchasedto.purchaseDate,
                paymentMethod: purchasedto.paymentMethod,
                bill: purchasedto.bill,
                totalPrice: purchasedto.purchase.reduce((sum, item) => sum + item.price * item.quantity, 0),
            })

            const purchase = await queryRunner.manager.save(newPurchase)

            const purchaseItems = purchasedto.purchase.map((item) => ({
                productId: item.productId,
                quantity: Number(item.quantity),
                price: Number(item.price),
                purchaseId: purchase.id,
            }));

           await queryRunner.manager.save(PurchaseItemEntity,purchaseItems)
        }catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Failed to add purchase: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    }
}
