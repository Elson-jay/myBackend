import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'vendor'})
export class VendorEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    vendorName:string;

    @Column()
    phoneno:number;

    @Column()
    email:string;
}