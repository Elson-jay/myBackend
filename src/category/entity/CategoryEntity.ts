import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategoryEntity } from "./SubCategoryEntity";

@Entity({name:'category'})
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    categoryname:string;

    @OneToMany(() => SubCategoryEntity,(subcategory) => subcategory.category,{cascade:true})
    subCategory:SubCategoryEntity[]
}