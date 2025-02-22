import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class UpdateProductDto {
    @IsNotEmpty()
    @ApiProperty()
    id:number;

    @IsNotEmpty()
    @ApiProperty()
    productName:string;

    @IsNotEmpty()
    @ApiProperty()
    productPrice:number;

    @IsNotEmpty()
    @ApiProperty()
    salesPrice:number;

    @IsNotEmpty()
    @ApiProperty()
    mrp:number;

    @IsNotEmpty()
    @ApiProperty()
    catgoryId:number;

    @IsNotEmpty()
    @ApiProperty()
    subCatgoryId:number;

    @IsNotEmpty()
    @ApiProperty()
    productimg:string;
    
}

export class ProductDeleteDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    id:number
}