import { InventoryEntity } from "src/inventory/entity/InventoryEntity";
import { OrderCartEntity } from "src/ordercart/entity/OrderCartEntity";
import { PurchaseItemEntity } from "src/purchase/entity/PurchaseItemEntity";
import { UserPurchaseEntity } from "src/userpurchase/entity/UserPurchaseEntity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    catgoryId:number;

    @Column()
    subCatgoryId:number;

    @Column()
    productImage:string

    @Column()
    Threshold:number;

    @Column({default:false})
    isDelete:boolean;

    @OneToOne(() => InventoryEntity,(inventory) => inventory.product)
    invintory:InventoryEntity;

    @OneToOne(() => UserPurchaseEntity,(UserPurchse)=> UserPurchse.product)
    purchases:UserPurchaseEntity;

    @OneToOne(() => OrderCartEntity,(ordercart)=> ordercart.product)
    ordercart:OrderCartEntity;

    @OneToMany(() => PurchaseItemEntity,(purchaseItem) => purchaseItem.purchase)
    purchaseItem:PurchaseItemEntity[];

} 