/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  Validate,
} from 'class-validator';
import { serialize } from 'v8';
import { Transform }  from 'class-transformer';
import { MaxFileSize } from '../validator/size.validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNotEmpty()
  @IsString()
  product_desc: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  @Validate(MaxFileSize, [2 * 1024 * 1024])
  product_pictures?: string;

  @IsOptional()
  @IsString()
  @Validate(MaxFileSize, [5 * 1024 * 1024])
  product_videos?: string;

}
