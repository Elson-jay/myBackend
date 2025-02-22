import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {

    @IsNotEmpty({message:'product name is required'})
    @IsString()
    productName:string;

    @IsNotEmpty({message:'price is required'})
    @IsNumber()
    productPrice:number;

    @IsNotEmpty({message:'sales Price is required'})
    salesPrice:number;

    @IsNotEmpty({message:''})
    mrp:number;

    @IsNotEmpty()
    catgoryId:number;

    @IsNotEmpty()
    subCatgoryId:number;

    @IsNotEmpty()
    productimg:string;
}
