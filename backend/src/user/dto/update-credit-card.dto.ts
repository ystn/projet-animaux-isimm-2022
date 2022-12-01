import { IsDateString, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class UpdateCreditCardDto{
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