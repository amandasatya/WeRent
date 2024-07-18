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
  HttpStatus,
  HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../authentication/guard/jwt_auth.guard';
import { ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Successfully created product' })
  @ApiBadRequestResponse({status: 404, description: 'Invalid data'})
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto) {
      const result = await this.productService.create(createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created',
      data: result,
    } ;
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

      return { 
        statusCode: HttpStatus.OK,
        message: 'File uploaded successfully.',
        data: base64String,
      };
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

      return { 
        statusCode: HttpStatus.OK,
        message: 'File uploaded successfully.',
        data: base64String,
      };
    } catch (error) {
      console.error('Upload file error:', error);
      throw new HttpException(`Failed to upload file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 201, description: 'Successfully get products' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  // @UsePipes(new ParseIntPipe(), new PricePipe())
  async findAll() {

    const result = await this.productService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: "Successfully get products",
      data: result,
    };
  }



  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 201, description: 'Successfully get product by id' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  // @UsePipes(new ParseIntPipe(), new PricePipe())
  async findOne(@Param('id') id: string){
    
    const result = await this.productService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: "Successfully get product by id",
      data: result,
    };
  }



  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 201, description: 'Successfully update data product' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto){

    const result = await this.productService.update(+id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: "Successfully update product",
      data: result,
    };
  }



  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Successfully Delete data' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  async remove(@Param('id') id: string) {

    const result = await this.productService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: "Successfully Delete product",
      data: result,
    };
  }



  @UseGuards(JwtAuthGuard)
  @Delete(':product_id/delete-picture')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Successfully deleted product picture' })
  @ApiBadRequestResponse({ status: 404, description: 'Invalid data' })
  async deletePicture(
    @Param('product_id', ParseIntPipe) product_id: number){
    try {
      await this.productService.deleteFile(product_id, 'picture');
      return { 
        statusCode: HttpStatus.OK,
        message: 'Picture deleted successfully.',
        data: null,
      };
    } catch (error) {
      console.error('Delete picture error:', error);
      throw new HttpException(`Failed to delete picture: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @UseGuards(JwtAuthGuard)
  @Delete(':product_id/delete-video')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Successfully deleted product video' })
  @ApiBadRequestResponse({ status: 404, description: 'Invalid data' })
  async deleteVideo(
    @Param('product_id', ParseIntPipe) product_id: number){
    try {
      await this.productService.deleteFile(product_id, 'video');
      return { 
        statusCode: HttpStatus.OK,
        message: 'Video deleted successfully.',
        data: null,
      };
    } catch (error) {
      console.error('Delete video error:', error);
      throw new HttpException(`Failed to delete video: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}