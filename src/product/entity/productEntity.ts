import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'product'})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productName:string;

    @Column()
    productPrice:number;

    @Column()
    salesPrice:number;

    @Column()
    mrp:number;

    @Column()
    stockId:number;

    @Column()
    catgoryId:number;

    @Column()
    subCatgoryId:number;

    @Column()
    productImage:string

    @Column()
    Threshold:number;

} 