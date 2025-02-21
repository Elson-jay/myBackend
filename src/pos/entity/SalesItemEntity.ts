import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'salesitem'})
export class SalesItemEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:number;

    @Column()
    productname:string;

    @Column()
    quantity:number;

    @Column()
    price:number;
}