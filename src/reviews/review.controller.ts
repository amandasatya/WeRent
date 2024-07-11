/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
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
  async createReview(@Body() createReviewDto: CreateReviewDto, @User() user): Promise<Review> {
    return this.reviewService.createReview(createReviewDto, user);
  }


  @Get()
  async getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  async getReviewById(@Param('id') id: string): Promise<Review> {
    return this.reviewService.getReviewById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewService.updateReview(+id, updateReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<Review> {
    return this.reviewService.deleteReview(+id);
  }
}
