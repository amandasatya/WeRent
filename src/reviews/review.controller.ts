/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt_auth.guard';
import { User } from '../authentication/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Body() createReviewDto: CreateReviewDto, @User() user): Promise<Review> {
    return this.reviewService.createReview(createReviewDto, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getReviewById(@Param('id') id: string): Promise<Review> {
    const review = await this.reviewService.getReviewById(+id);
    if(!review) {
      throw new NotFoundException("Review Not Found!");
    }
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewService.updateReview(+id, updateReviewDto);
    if (!review) {
      throw new NotFoundException("Review Not Found!");
    }
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(@Param('id') id: string): Promise<Review> {
    const review = await this.reviewService.deleteReview(+id);
    if (!review) {
      throw new NotFoundException("Review Not Found!")
    }
    return review;
  }
}
