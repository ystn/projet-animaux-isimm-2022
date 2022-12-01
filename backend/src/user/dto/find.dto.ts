import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindDto {
    @IsOptional()
    @IsString()
    type: string

    @IsOptional()
    @IsNumber()
    id: number
}