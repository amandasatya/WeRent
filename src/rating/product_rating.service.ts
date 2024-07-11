import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Rating } from '@prisma/client';
import { ProductRatingDto } from './dto/product_rating.dto';

@Injectable()
export class ProductRatingService {
  constructor(private prisma: PrismaService) {}

  async createRating(ratingDto: ProductRatingDto): Promise<Rating> {
    const { userId, productId, value } = ratingDto;
    const data: any = {
      user: { connect: { id: userId } },
      product: { connect: { product_id: productId } },
      value: value,
    };

    return this.prisma.rating.create({ data });
  }

  async getRatingsForProduct(productId: number): Promise<Rating[]> {
    return this.prisma.rating.findMany({
      where: { product_id: productId },
      include: {
        user: true,
        product: true,

      },
    });
  }
}
