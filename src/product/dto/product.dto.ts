
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { serialize } from 'v8';

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
  product_pictures?: Buffer;

  review: string;
  rating: number;
}
