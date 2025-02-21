import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'salesPOS'})
export class SalesEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    customerid:number;

    @Column()
    phoneno:number;

    @Column()
    amount:number;

    @Column()
    salesItemId:number;

    @Column()
    quantity:number;

    @Column()
    bill:string;
}