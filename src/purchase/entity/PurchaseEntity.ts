import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseItemEntity } from "./PurchaseItemEntity";

@Entity({name:'purchase'})
export class PurchaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    supplierId:number;

    @Column()
    purchaseDate:Date;

    @Column()
    totalPrice:number;

    @Column()
    paymentMethod:string;

    @Column()
    bill:string;

    @OneToMany(() => PurchaseItemEntity,(item)=>item.purchase,{cascade:true})
    item:PurchaseItemEntity[];
}