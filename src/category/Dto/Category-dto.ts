import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAscii, IsNotEmpty, ValidateNested } from "class-validator";


export class subCategoryDto {
    @IsNotEmpty()
    @ApiProperty()
    subcategoryname:string

    @IsNotEmpty()
    categoryId:number
}

export class CategoryDto {

    @IsNotEmpty()
    @ApiProperty()
    categoryname:string

    @IsAscii()
    @ValidateNested({each:true})
    @ApiProperty()
    @Type(() => subCategoryDto)
    @ApiProperty({ type: [subCategoryDto] })
    subcategory:subCategoryDto[];
}