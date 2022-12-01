import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateReportDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    postId: number

    @IsNotEmpty()
    description: string
}
