import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateOrderCartDto {
    @IsNotEmpty()
    quantity:number
  }

export class CreateOrderCartDto { 
    @IsNotEmpty()
    @ApiProperty()
    productId:number

    @IsNotEmpty()
    @ApiProperty()
    quantity:number
}

export class deleteOrderCartDto {
    @IsNotEmpty()
    @ApiProperty()
    orderId:number
}
  