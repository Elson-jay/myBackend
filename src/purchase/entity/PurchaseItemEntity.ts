import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'purchaseitems'})
export class PurchaseItemEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:number;

    @Column()
    productname:string;

    @Column()
    quantity:string;

    @Column()
    price:number;
}