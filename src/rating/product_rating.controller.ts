/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductRatingService } from './product_rating.service';
import { ProductRatingDto } from './dto/product_rating.dto';

@Controller('rating')
export class ProductRatingController {
  constructor(private readonly ratingService: ProductRatingService) {}

  @Post('add')
  async createRating(@Body() ratingDto: ProductRatingDto) {
    return this.ratingService.createRating(ratingDto);
  }

  @Get('product/:product_id')
  async getRatingsForProduct(@Param('product_id') product_id: number) {
    return this.ratingService.getRatingsForProduct(product_id);
  }

  @Get('product/:product_id/average')
  async getAverageRatingForProduct(@Param('product_id') product_id: number) {
    return this.ratingService.getAverageRatingForProduct(product_id);
  }
}
