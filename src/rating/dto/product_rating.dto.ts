import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class ProductRatingDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;

  //   @IsInt()
  //   @IsNotEmpty()
  //   reviewId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  value: number;
}
