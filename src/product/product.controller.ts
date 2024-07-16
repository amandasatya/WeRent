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
import { writeFile } from 'fs/promises';
import { join } from 'path';
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
  @Patch(':product_id/upload-picture')
  @UseInterceptors(FileInterceptor('product_pictures'))
  async uploadFile(
    @Param('product_id', ParseIntPipe) product_id: number,
    @UploadedFile() product_pictures: Express.Multer.File) {

    console.log('File uploaded:', product_pictures);
    try {
      if (!product_pictures || !product_pictures.buffer) {
        throw new HttpException('file or file buffer is undefined.', HttpStatus.BAD_REQUEST);
      }

      const base64String = product_pictures.buffer.toString('base64');
      await this.productService.uploadFile(product_id, base64String, 'picture');

      const filePath = join(__dirname, '..', '..', 'uploads', product_pictures.originalname);
      await writeFile(filePath, product_pictures.buffer);

      return { message: 'File uploaded successfully.' };
    } catch (error) {
      console.error('Upload file error:', error);
      throw new HttpException(`Failed to upload file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':product_id/upload-video')
  @UseInterceptors(FileInterceptor('product_videos'))
  async uploadVideo(
    @Param('product_id', ParseIntPipe) product_id: number,
    @UploadedFile() product_videos: Express.Multer.File) {

    console.log('File uploaded:', product_videos);
    try {
      if (!product_videos || !product_videos.buffer) {
        throw new HttpException('file or file buffer is undefined.', HttpStatus.BAD_REQUEST);
      }

      const base64String = product_videos.buffer.toString('base64');
      await this.productService.uploadFile(product_id, base64String, 'video');

      const filePath = join(__dirname, '..', '..', 'uploads', product_videos.originalname);
      await writeFile(filePath, product_videos.buffer);

      return { message: 'File uploaded successfully.' };
    } catch (error) {
      console.error('Upload file error:', error);
      throw new HttpException(`Failed to upload file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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