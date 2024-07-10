/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProductDto) {
    const { size, ...rest } = dto;
    return this.prismaService.product.create({
      data: {
        ...rest,
        size: { set: size },
      },
    });
  }

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: { product_id: id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { size, ...rest } = updateProductDto;
    return this.prismaService.product.update({
      where: { product_id: id },
      data: {
        ...rest,
        size: size? { set: size} : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.product.delete({
      where: { product_id: id },
    });
  }
}