import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FindDto {
    @IsOptional()
    @IsString()
    type: string;

    @IsArray()
    @IsOptional()
    tags: string[];
}