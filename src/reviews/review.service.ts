/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(data: CreateReviewDto): Promise<Review> {
    return this.prisma.review.create({
      data,
    });
  }

  async getReviews(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async getReviewById(review_id: number): Promise<Review> {
    return this.prisma.review.findUnique({
      where: { review_id },
    });
  }

  async updateReview(review_id: number, data: UpdateReviewDto): Promise<Review> {
    return this.prisma.review.update({
      where: { review_id },
      data,
    });
  }

  async deleteReview(review_id: number): Promise<Review> {
    return this.prisma.review.delete({
      where: { review_id },
    });
  }
}
