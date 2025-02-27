import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseEntity } from "./PurchaseEntity";
import { ProductEntity } from "src/product/entity/productEntity";

@Entity({ name: 'purchaseitems' })
export class PurchaseItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseItems, { eager: true })
    @JoinColumn({ name: 'purchaseId' })
    purchase: PurchaseEntity;

    @Column()
    purchaseId: number;

    @Column()
    productId: number;

    @ManyToOne(() =>ProductEntity,(product) => product.purchaseItem)
    @JoinColumn({name:'productId'})
    product:ProductEntity;

    @Column({ type: 'int' })  
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })  
    price: number;
}
