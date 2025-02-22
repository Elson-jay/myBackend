import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class UpdateProductDto {
    @IsNotEmpty()
    id:number;

    @IsNotEmpty()
    productName:string;

    @IsNotEmpty()
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

export class ProductDeleteDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    id:number
}