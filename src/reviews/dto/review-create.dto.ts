/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEnum, IsInt, IsOptional, Validate } from 'class-validator';
import { Scale } from '@prisma/client';
import { MaxFileSize } from 'src/product/validator/size.validator';

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
  
  @IsOptional()
  @IsString()
  @Validate(MaxFileSize, [2 * 1024 * 1024])
  review_pictures?: string;

  @IsOptional()
  @IsString()
  @Validate(MaxFileSize, [5 * 1024 * 1024])
  review_videos?: string;
}