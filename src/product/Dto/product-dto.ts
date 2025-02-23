import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {
    

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    productName:string;

    @IsNotEmpty()
    @IsNumber()
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
    productImage:string;
}
