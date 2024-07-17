/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Rating } from '@prisma/client';
import { ProductRatingDto } from './dto/product_rating.dto';

@Injectable()
export class ProductRatingService {
  constructor(private prisma: PrismaService) {}

  async createRating(ratingDto: ProductRatingDto): Promise<Rating> {
    const { userId, product_id, ratingValue } = ratingDto;
    const data: any = {
      user: { connect: { id: userId } },
      product: { connect: { product_id: product_id } },
      ratingValue: ratingValue,
    };

    return this.prisma.rating.create({ data });
  }

  async getRatingsForProduct(product_id: number): Promise<Rating[]> {
    console.log('Product ID:', product_id);
    return this.prisma.rating.findMany({
      where: {
        product_id: Number(product_id),
      },
      include: {
        user: true,
        product: true,
      },
    });
  }

  async getAverageRatingForProduct(product_id: number) {
    const productRatings = await this.prisma.rating.findMany({
      where: { product_id: Number(product_id) },
    });

    if (productRatings.length === 0) {
      return { averageRating: 0 };
    }

    const sumRatings = productRatings.reduce(
      (sum, rating) => sum + rating.ratingValue,
      0,
    );
    const averageRating = sumRatings / productRatings.length;
    return { averageRating };
  }
}
