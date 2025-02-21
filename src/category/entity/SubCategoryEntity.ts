import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'subcategory'})
export class SubCategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    subcategoryname:string;

    @Column()
    categoryId:number;
}