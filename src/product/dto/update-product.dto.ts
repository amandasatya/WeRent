/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsInt, IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';
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
    product_pictures?: Buffer;

}