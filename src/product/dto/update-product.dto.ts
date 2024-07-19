/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, IsArray, ArrayNotEmpty, Validate } from 'class-validator';
import { MaxFileSizeValidator } from '../validator/size.validator';
import { CreateProductDto } from './product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsString()
  product_desc?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @Validate(MaxFileSizeValidator, [2 * 1024 * 1024])
  product_pictures?: string[];

  @IsOptional()
  @Validate(MaxFileSizeValidator, [5 * 1024 * 1024])
  product_videos?: string;
}