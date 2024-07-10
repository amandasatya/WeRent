/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, IsArray, IsOptional } from 'class-validator';
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
    size?: string[];

    @IsOptional()
    @IsInt()
    price?: number;

    @IsOptional()
    product_pictures?: Buffer;

}