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
import { MaxFileSizeValidator } from '../validator/size.validator';

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
  @Validate(MaxFileSizeValidator, [2 * 1024 * 1024])
  product_pictures?: Buffer;

  @IsOptional()
  @Validate(MaxFileSizeValidator, [2 * 1024 * 1024])
  product_videos?: Buffer;

}
