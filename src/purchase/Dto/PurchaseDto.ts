import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAscii, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { PurchaseItemEntity } from "../entity/PurchaseItemEntity";
import { PurchaseItemDto } from "./PurchaseItemDto";


export class PurchaseDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    supplierId:number;

    @IsNotEmpty()
    @ApiProperty()
    purchaseDate:Date;

    @IsNotEmpty()
    @ApiProperty()
    paymentMethod:string;

    @IsNotEmpty()
    @ApiProperty()
    bill:string;

    @IsAscii()
    @ValidateNested({each:true})
    @ApiProperty()
    @Type(() => PurchaseItemDto)
    @ApiProperty({type:[PurchaseItemDto]})
    purchase:PurchaseItemDto[];

}