import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./CategoryEntity";

@Entity({name:'subcategory'})
export class SubCategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    subcategoryname:string;

    @Column()
    categoryId:number;

    @ManyToOne(() => CategoryEntity,(category)=>category.subCategory)
    @JoinColumn({name:'categoryId'})
    category:CategoryEntity[]
}