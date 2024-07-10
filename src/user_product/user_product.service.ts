import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserProductDto } from './dto/user_product.dto';

@Injectable()
export class UserProductService {
    constructor ( private prismaService: PrismaService ) {}

    async create(dto: CreateUserProductDto) {
        return this.prismaService.userProduct.create({
            data: dto,
        });
    }

    async findAll() {
        return this.prismaService.userProduct.findMany();
    }

    async findOne(user_id: number, product_id: number) {
        return this.prismaService.userProduct.findUnique({
          where: {
            user_id_product_id: { user_id, product_id },
          },
        });
      }

    async remove(user_id: number, product_id: number) {
        return this.prismaService.userProduct.delete({
          where: {
            user_id_product_id: { user_id, product_id }, 
          },
        });
      }

}
