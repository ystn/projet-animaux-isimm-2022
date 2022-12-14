import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    titre: string

    @IsString()
    @IsNotEmpty()
    corps: string

    @IsArray()
    tags: string[]

    @IsNumber()
    @IsNotEmpty()
    userId: number
}
