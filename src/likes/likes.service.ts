/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async createLike(user_id: number, review_id: number) {
    const existingLike = await this.prisma.like.findFirst({
      where: {
        user_id: user_id,
        review_id: review_id,
        deletedAt: null, // Soft Delete
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
  }

  // async createLike(user_id: number, review_id: number) {
  //   const existingLike = await this.prisma.like.findUnique({
  //     where: {
  //       user_id_review_id: {
  //         user_id: user_id,
  //         review_id: review_id,
  //       },
  //     },
  //   });

  //   if (existingLike) {
  //     throw new Error('User has already liked this review.');
  //   }

  //   return this.prisma.like.create({
  //     data: {
  //       user_id: user_id,
  //       review_id: review_id,
  //     },
  //   });

  //   const likesCount = await this.prisma.like.count({
  //     where: {review_id: review_id},
  //   });

  //   return {review_id, likesCount};
  // }

  //Normal Delete
  // async removeLike(user_id: number, review_id: number) {
  //   // Check if the like exists
  //   const existingLike = await this.prisma.like.findUnique({
  //     where: {
  //       user_id_review_id: {
  //         user_id: user_id,
  //         review_id: review_id,
  //       },
  //     },
  //   });

  //   if (!existingLike) {
  //     throw new Error('Like does not exist.');
  //   }

  //   return this.prisma.like.delete({
  //     where: {
  //       user_id_review_id: {
  //         user_id: user_id,
  //         review_id: review_id,
  //       },
  //     },
  //   });

  //   const likesCount = await this.prisma.like.count({
  //     where: { review_id: review_id },
  //   });

  //   return { review_id, likesCount };
  // }

  //Soft Delete
  async removeLike(user_id: number, review_id: number) {
    // Check if the like exists
    const existingLike = await this.prisma.like.findFirst({
      where: {
        user_id: user_id,
        review_id: review_id,
        deletedAt: null,
      },
    });

    if (!existingLike) {
      throw new Error('Like does not exist.');
    }

    return this.prisma.like.update({
      where: {
        like_id: existingLike.like_id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async getLikesByReview(review_id: number) {
    const likesCount = await this.prisma.like.count({
      where: {
        review_id: review_id,
        deletedAt: null,
      },
    })
    return {review_id, likesCount}
  }

  async getLikesByUser(user_id: number) {
    const likesCount = await this.prisma.like.count({
      where: { user_id: user_id, deletedAt: null, },
    })
    return {user_id, likesCount}
  }

  // //Soft Delete By Using Review ID
  // async removeLikesByReview(review_id: number) {
  //   // Check if there are any likes for the review
  //   const existingLikes = await this.prisma.like.findMany({
  //     where: {
  //       review_id: review_id,
  //       deletedAt: null, // only looking for active likes
  //     },
  //   });

  //   if (existingLikes.length === 0) {
  //     throw new Error('No likes found for this review.');
  //   }

  //   const likeIds = existingLikes.map(like => like.like_id);

  //   await this.prisma.like.updateMany({
  //     where: {
  //       like_id: { in: likeIds },
  //     },
  //     data: {
  //       deletedAt: new Date(),
  //     },
  //   });

  //   const likesCount = await this.prisma.like.count({
  //     where: { review_id: review_id, deletedAt: null },
  //   });

  //   return { review_id, likesCount };
  // }
}