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

  async removeLike(likeId: number) {
    return this.prisma.like.delete({
      where: { like_id: likeId },
    });
  }

  async getLikesByReview(reviewId: number) {
    return this.prisma.like.findMany({
      where: { review_id: reviewId },
    });
  }
}
