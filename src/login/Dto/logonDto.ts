import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class loginDto {
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @ApiProperty()
    password:string;
}