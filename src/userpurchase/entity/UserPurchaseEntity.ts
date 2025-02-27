import { UserEntity } from "src/login/entity/UserEntity";
import { ProductEntity } from "src/product/entity/productEntity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from "typeorm";


@Entity({ name: "Userpurchase" }) // Table name: purchase
export class UserPurchaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @ManyToOne(() => ProductEntity, (product) => product.purchases)
    @JoinColumn({ name: "productId" }) 
    product: ProductEntity;

    @Column()
    userId: number;

    @Column()
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    totalPrice: number;

    @CreateDateColumn({ type: "timestamp" })
    purchaseDate: Date;

    @Column({ default: 1 }) 
    statusId: number;
}
