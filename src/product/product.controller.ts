/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UsePipes, 
  ParseIntPipe, 
  UseGuards, 
  UploadedFile, 
  UseInterceptors, 
  HttpException, 
  HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PricePipe } from './pipes/price.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/guard/jwt_auth.guard';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import * as fs from 'fs';
import { Product } from '@prisma/client';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  

  @UseGuards(JwtAuthGuard)
  @Patch(':product_id/upload-url')
  async uploadFileByUrl(
    @Param('product_id', ParseIntPipe) product_id: number,
    @Body('url') imageUrl: string) {

    console.log('URL uploaded:', imageUrl);
    try {
      const imagePath = await this.productService.downloadImage(imageUrl);
      const imageBuffer = await fs.promises.readFile(imagePath);
      const base64String = imageBuffer.toString('base64');

      await this.productService.uploadFile(product_id, base64String, 'picture');

      return { message: 'File uploaded successfully.' };
    } catch (error) {
      console.error('Upload file by URL error:', error);
      throw new HttpException(`Failed to upload file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get()
  // @UsePipes(new ParseIntPipe(), new PricePipe())
  async findAll() {
    return await this.productService.findAll();
  }


  @Get(':id')
  // @UsePipes(new ParseIntPipe(), new PricePipe())
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }

}