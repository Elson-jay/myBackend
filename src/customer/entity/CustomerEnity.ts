import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'customer'})
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    customername:string

    @Column()
    phoneno:number

    @Column()
    userId:number

    @Column()
    address:string
}