import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderCartEntity } from 'src/ordercart/entity/OrderCartEntity';
import { Repository } from 'typeorm';
import { UserPurchaseEntity } from './entity/UserPurchaseEntity';
import { InventoryEntity } from 'src/inventory/entity/InventoryEntity';

@Injectable()
export class UserpurchaseService {
    constructor(
        @InjectRepository(OrderCartEntity)
        private readonly ordercartRepository:Repository<OrderCartEntity>,
        @InjectRepository(UserPurchaseEntity)
        private readonly userPurchaseRepository:Repository<UserPurchaseEntity>,
        @InjectRepository(InventoryEntity)
        private readonly inventoryRepository:Repository<InventoryEntity>
    ){}

    async purchaseOrder(userId: number) {
        const orderCartItems = await this.ordercartRepository.find({
            where: { userId },
        });
    
        if (orderCartItems.length === 0) {
            throw new BadRequestException("No items in the cart.");
        }

        const purchaseRecords = orderCartItems.map((order) => ({
            userId: order.userId,
            productId: order.productId,
            quantity: order.quantity,
            totalPrice: order.totalPrice,
            purchaseDate: new Date(),
        }));
    
        await this.userPurchaseRepository.save(purchaseRecords);
    
        await this.ordercartRepository.delete({ userId });
    
        for (const order of orderCartItems) {
            const inventory = await this.inventoryRepository.findOne({
                where: { productId: order.productId },
            });
    
            if (inventory) {
                inventory.quantity = Math.max(0, inventory.quantity - order.quantity); 
                await this.inventoryRepository.save(inventory);
            }
        }
    
        return { message: "Purchase successful!" };
    }

    async getUserPurchase(userid:number,roleId:number){
        const queryBuilder = this.userPurchaseRepository.createQueryBuilder("purchases")
        .leftJoin("purchases.product", "product")
        .select([
            "purchases.id AS ID",
            "purchases.productId AS PRODUCTID",
            "purchases.userId AS USERID",
            "product.productName AS PRODUCTNAME",
            "product.salesPrice AS PRICE",
            "purchases.quantity AS QUANTITY",
            "purchases.totalPrice AS TOTALPRICE",
            "purchases.purchaseDate AS PURCHASEDATE",
            "purchases.statusId AS STATUSID",
        ]);

        if (roleId !== 1) {
            queryBuilder.where("purchases.userId = :userId", { userId: userid });
        }
        const data = await queryBuilder.getRawMany();

    
        return {message:'get User Purchase' , code:200, data:data}
    }

    async cancelPurchase(purchaseId:number,userId:number){
        const purchase = await this.userPurchaseRepository.findOne({where:{id:purchaseId}});
        if(purchase?.userId !== userId){
            throw new UnauthorizedException("You not not Purchase")
        }
        const inventory = await this.inventoryRepository.findOne({where:{productId:purchase?.productId}})
        const newvalue = Number(inventory?.quantity) + Number(purchase?.quantity);
        await this.inventoryRepository.update({id:inventory?.id},{quantity:newvalue})

        await this.userPurchaseRepository.delete({id:purchaseId})
        return {message:'Purchase is Cancelled'}
    }
    
}
