import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class PurchaseItemDto {
    @IsNotEmpty()
    @ApiProperty()
    productId:number;

    @IsNotEmpty()
    @ApiProperty()
    quantity:number;

    @IsNotEmpty()
    @ApiProperty()
    price:number;
}