/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get()
  async getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  async getReviewById(@Param('id') id: string): Promise<Review> {
    return this.reviewService.getReviewById(+id);
  }

  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewService.updateReview(+id, updateReviewDto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<Review> {
    return this.reviewService.deleteReview(+id);
  }
}
