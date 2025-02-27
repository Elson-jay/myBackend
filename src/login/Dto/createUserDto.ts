import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateUserDto {
     @IsNotEmpty()
     @ApiProperty()
     email:string;

     @IsNotEmpty()
     @ApiProperty()
     password:string;
}