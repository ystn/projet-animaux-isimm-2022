import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator"

export class CreateGroupDto {
    @IsNotEmpty()
    @IsUrl()
    url: string

    @IsNotEmpty()
    @IsString()
    nom: string

    @IsOptional()
    @IsString()
    description: string

    @IsNotEmpty()
    userId: number

    @IsOptional()
    tags: string[]
}
