import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {

    @IsNotEmpty()
    @IsString()
    productName:string;

    @IsNotEmpty()
    @IsNumber()
    productPrice:number;

    @IsNotEmpty()
    salesPrice:number;

    @IsNotEmpty()
    mrp:number;

    @IsNotEmpty()
    catgoryId:number;

    @IsNotEmpty()
    subCatgoryId:number;

    @IsNotEmpty()
    productimg:string;
}
