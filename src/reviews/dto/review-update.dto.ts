/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
import { Scale } from '@prisma/client';

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Scale)
  fit_scale?: Scale;
}
