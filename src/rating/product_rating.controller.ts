/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
  HttpException,
  Put,
} from '@nestjs/common';
import { ProductRatingService } from './product_rating.service';
import { ProductRatingDto } from './dto/product_rating.dto';
import { JwtAuthGuard } from '../authentication/guard/jwt_auth.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('rating')
export class ProductRatingController {
  constructor(private readonly ratingService: ProductRatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async createRating(@Body() ratingDto: ProductRatingDto) {
    const result = await this.ratingService.createRating(ratingDto);
    if (result) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Data Rating Successfully created!',
        data: result,
      };
    }
  }

  @Get('product/:product_id')
  @HttpCode(HttpStatus.OK)
  async getRatingsForProduct(@Param('product_id') product_id: number) {
    const result = await this.ratingService.getRatingsForProduct(product_id);
    if (result) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Rating Successfully fetched!',
        data: result,
      };
    }
  }

  @Get('product/:product_id/average')
  @HttpCode(HttpStatus.OK)
  async getAverageRatingForProduct(@Param('product_id') product_id: number) {
    const result =
      await this.ratingService.getAverageRatingForProduct(product_id);
    if (result) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Rating Successfully fetched!',
        data: result,
      };
    }
  }
}
