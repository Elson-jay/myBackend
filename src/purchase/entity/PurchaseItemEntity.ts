import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseEntity } from "./PurchaseEntity";

@Entity({ name: 'purchaseitems' })
export class PurchaseItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.item, { eager: true })
    @JoinColumn({ name: 'purchaseId' })
    purchase: PurchaseEntity;

    @Column()
    purchaseId: number;

    @Column({ type: 'int' })  
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })  
    price: number;
}
