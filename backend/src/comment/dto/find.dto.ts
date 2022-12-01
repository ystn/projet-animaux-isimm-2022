import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FindDto {
    @IsOptional()
    @IsString()
    type: string;
}