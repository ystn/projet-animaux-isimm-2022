import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    commentedToId: number

    @IsNotEmpty()
    @IsString()
    corps: string
}
