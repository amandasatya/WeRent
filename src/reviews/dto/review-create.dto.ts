/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Scale } from '@prisma/client';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(Scale)
  @IsOptional()
  fit_scale: Scale;
}