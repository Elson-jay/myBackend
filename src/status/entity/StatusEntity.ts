import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'status'})
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    statusname:string;
}