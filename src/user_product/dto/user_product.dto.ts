/* eslint-disable prettier/prettier */
import { IsInt } from 'class-validator';

export class CreateUserProductDto {
  @IsInt()
  user_id: number;

  @IsInt()
  product_id: number;
}