import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async createLike(userId: number, reviewId: number) {
    // Check if the user has already liked the review
    const existingLike = await this.prisma.like.findUnique({
      where: {
        user_id_review_id: {
          user_id: userId,
          review_id: reviewId,
        },
      },
    });

    if (existingLike) {
      throw new Error('User has already liked this review.');
    }

    return this.prisma.like.create({
      data: {
        user_id: userId,
        review_id: reviewId,
      },
    });
  }

  async removeLike(userId: number, reviewId: number) {
    // Check if the like exists
    const existingLike = await this.prisma.like.findUnique({
      where: {
        user_id_review_id: {
          user_id: userId,
          review_id: reviewId,
        },
      },
    });

    if (!existingLike) {
      throw new Error('Like does not exist.');
    }

    return this.prisma.like.delete({
      where: {
        user_id_review_id: {
          user_id: userId,
          review_id: reviewId,
        },
      },
    });
  }

  async getLikesByReview(reviewId: number) {
    return this.prisma.like.findMany({
      where: { review_id: reviewId },
    });
  }

  async getLikesByUser(userId: number) {
    return this.prisma.like.findMany({
      where: { user_id: userId },
    });
  }
}
