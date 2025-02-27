import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class DeleteUserPurchaseDto {
    @IsNotEmpty()
    @ApiProperty()
    purchaseId:number
}