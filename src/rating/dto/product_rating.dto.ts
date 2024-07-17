/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class ProductRatingDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  ratingValue: number;
}
