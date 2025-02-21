import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'purchase'})
export class PurchaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    purchaseitemid:number;

    @Column()
    quantity:number;

    @Column()
    purchasePrice:number;

    @Column()
    supplierId:number;

    @Column()
    purchaseDate:Date;

    @Column()
    totalPrice:number;

    @Column()
    bill:string;
}