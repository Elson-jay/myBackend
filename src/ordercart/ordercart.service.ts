import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderCartEntity } from './entity/OrderCartEntity';
import { CreateOrderCartDto } from './Dto/order-cart.dto';
import { ProductEntity } from 'src/product/entity/productEntity';


@Injectable()
export class OrdercartService {
    constructor(
        @InjectRepository(OrderCartEntity)
        private readonly orderCartRepository:Repository<OrderCartEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository:Repository<ProductEntity>,
    ){}

    async addOrderCart(ordercartdto:CreateOrderCartDto,userId:number){
        const product = await this.productRepository.findOne({where:{id:ordercartdto.productId}})
        const totalPrice = Number(product?.salesPrice) * ordercartdto.quantity;
        const newOrder = this.orderCartRepository.create({userId:userId,...ordercartdto,totalPrice:totalPrice})
        await this.orderCartRepository.save(newOrder)

        return {message:'add to Cart' , code:200}
    }

    async deleteOrderCart(orderCartId:number){
        const orderCart = await this.orderCartRepository.findOne({where:{id:orderCartId}});
        if(!orderCart){
            throw new BadRequestException("Not Fount Order")
        }
        await this.orderCartRepository.delete({id:orderCartId})
        return {message:'Delete order', code:200}
    }

    async getOrder(userid:number){

        const queryBuilder = this.orderCartRepository.createQueryBuilder('ordercart').leftJoin('ordercart.product','product').select([
            "ordercart.id AS ID",
            "ordercart.productId AS PRODUCTID",
            "ordercart.userId AS USERID",
            "product.productName AS PRODUCTNAME",
            "product.salesPrice AS PRICE",
            "ordercart.quantity AS QUANTITY",
            "ordercart.totalPrice AS TOTALPRICE",
        ]).where("ordercart.userId = :userId", { userId:userid }).getRawMany();

        const data = await queryBuilder;
        return {message:'order get',code:200, data:data}
    }
}
