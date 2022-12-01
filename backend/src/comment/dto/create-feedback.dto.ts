import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFeedbackDto {
    @IsNotEmpty()
    @IsNumber()
    postId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}