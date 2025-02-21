import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Inventory'})
export class InventoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:number;

    @Column()
    statusId:number;

    @Column()
    quantity:number;
}