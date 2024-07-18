/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ProductRatingService } from './product_rating.service';
import { ProductRatingDto } from './dto/product_rating.dto';
import { JwtAuthGuard } from '../authentication/guard/jwt_auth.guard';

@Controller('rating')
export class ProductRatingController {
  constructor(private readonly ratingService: ProductRatingService) {}

  @UseGuards(JwtAuthGuard)
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
