import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async createLike(user_id: number, review_id: number) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        user_id_review_id: {
          user_id: user_id,
          review_id: review_id,
        },
      },
    });

    if (existingLike) {
      throw new Error('User has already liked this review.');
    }

    return this.prisma.like.create({
      data: {
        user_id: user_id,
        review_id: review_id,
      },
    });

    const likesCount = await this.prisma.like.count({
      where: {review_id: review_id},
    });

    return {review_id, likesCount};
  }

  async removeLike(user_id: number, review_id: number) {
    // Check if the like exists
    const existingLike = await this.prisma.like.findUnique({
      where: {
        user_id_review_id: {
          user_id: user_id,
          review_id: review_id,
        },
      },
    });

    if (!existingLike) {
      throw new Error('Like does not exist.');
    }

    return this.prisma.like.delete({
      where: {
        user_id_review_id: {
          user_id: user_id,
          review_id: review_id,
        },
      },
    });

    const likesCount = await this.prisma.like.count({
      where: { review_id: review_id },
    });

    return { review_id, likesCount };
  }

  async getLikesByReview(review_id: number) {
    const likesCount = await this.prisma.like.count({
      where: {
        review_id: review_id
      },
    })
    return {review_id, likesCount}
  }

  async getLikesByUser(user_id: number) {
    const likesCount = await this.prisma.like.count({
      where: { user_id: user_id },
    })
    return {user_id, likesCount}
  }
}