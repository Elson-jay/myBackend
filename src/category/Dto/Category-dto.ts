import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAscii, IsNotEmpty, IsString, ValidateNested } from "class-validator";


export class subCategoryDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    @ApiProperty()
    subcategoryname:string

    @IsNotEmpty()
    categoryId:number
}

export class CategoryDto {

    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    @ApiProperty()
    categoryname:string

    @IsAscii()
    @ValidateNested({each:true})
    @ApiProperty()
    @Type(() => subCategoryDto)
    @ApiProperty({ type: [subCategoryDto] })
    subcategory:subCategoryDto[];
}