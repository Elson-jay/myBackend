import { ProductEntity } from "src/product/entity/productEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Inventory'})
export class InventoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:number;

    @OneToOne(() => ProductEntity,(product) =>product.invintory)
    @JoinColumn({name:'productId'})
    product:ProductEntity

    @Column()
    statusId:number;

    @Column()
    quantity:number;
}