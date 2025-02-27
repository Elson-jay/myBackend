import { ProductEntity } from "src/product/entity/productEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'orderCart'})
export class OrderCartEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productId:number

    @OneToOne(() => ProductEntity,(product)=>product.ordercart)
    @JoinColumn({name:'productId'})
    product:ProductEntity;

    @Column()
    quantity:number

    @Column()
    userId:number

    @Column()
    totalPrice:number
}