/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEnum, IsInt, Validate } from 'class-validator';
import { Scale } from '@prisma/client';
import { MaxFileSizeValidator } from '@nestjs/common';
import { MaxFileSize } from 'src/product/validator/size.validator';

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

  @IsOptional()
  @Validate(MaxFileSize, [2 * 1024 * 1024])
  product_pictures?: string;

  @IsOptional()
  @Validate(MaxFileSize, [5 * 1024 * 1024])
  product_videos?: string;

}