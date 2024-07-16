/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async createLike(userId: number, reviewId: number) {
    return this.prisma.like.create({
      data: {
        user_id: userId,
        review_id: reviewId,
      },
    });
  }

  async removeLike(like_id: number, review_id: number) {
    return this.prisma.like.delete({
      where: { like_id: like_id },
    });
  }

  async getLikesByReview(review_id: number) {
    return this.prisma.like.findMany({
      where: { review_id: review_id },
    });
  }

  async getLikesByUser(user_id: number) {
    return this.prisma.like.findMany({
      where: { user_id: user_id },
    });
  }
}
