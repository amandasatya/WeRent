import { IsInt, IsNotEmpty } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateLikeDto {
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsInt()
    @IsNotEmpty()
    review_id: number;
}