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

  @Get('product/:productId')
  async getRatingsForProduct(@Param('product_id') productId: number) {
    return this.ratingService.getRatingsForProduct(productId);
  }
}
