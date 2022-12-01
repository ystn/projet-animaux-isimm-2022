import { IsDateString, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateCreditCardDto{
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumberString()
    number: string;

    @IsNotEmpty()
    @IsDateString()
    exp: string;

    @IsNotEmpty()
    @IsNumberString()
    cvv: string;
}