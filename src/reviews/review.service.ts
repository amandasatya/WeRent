/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Review } from '@prisma/client';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(data: CreateReviewDto, user: any): Promise<Review> {
    return this.prisma.review.create({
      data,
    });
  }

  async getReviews(): Promise<Review[]> {
    return this.prisma.review.findMany({
      include: {
        product: true,
        likes: true,
        user: true,
      }
    });
  }

  async getReviewById(review_id: number): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { review_id },
      include: {
        product: true,
        likes: true,
        user: true,
      }
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${review_id} not found`);
    }

    return review;
  }

  async updateReview(review_id: number, data: UpdateReviewDto): Promise<Review> {
    return this.prisma.review.update({
      where: { review_id },
      data,
      include: {
        product: true,
        likes: true,
        user: true,
      },
    });
  }

  async deleteReview(review_id: number): Promise<Review> {
    await this.prisma.like.deleteMany({
      where: { review_id: review_id,},
    });

    try {
      return await this.prisma.review.delete({
        where: { review_id: review_id },
      });
    } catch (error) {
      throw new NotFoundException(`Review with id ${review_id} not found`);
    }
  }
}