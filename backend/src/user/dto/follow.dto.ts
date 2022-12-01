import { IsNotEmpty, IsNumber } from "class-validator";

export class FollowDto {
    @IsNotEmpty()
    @IsNumber()
    followerId: number;

    @IsNotEmpty()
    @IsNumber()
    followId: number;
}