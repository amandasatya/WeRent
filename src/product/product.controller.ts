/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseIntPipe, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PricePipe } from './pipes/price.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/guard/jwt_auth.guard';
import { User } from '../authentication/user.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':product_id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadFile(file);
  }



  @Get()
  @UsePipes(new ParseIntPipe(), new PricePipe())
  findAll() {
    return this.productService.findAll();
  }


  @Get(':id')
  @UsePipes(new ParseIntPipe(), new PricePipe())
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

}