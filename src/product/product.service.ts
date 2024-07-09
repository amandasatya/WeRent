import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor ( private prismaService: PrismaService ) {}

    async create(dto: CreateProductDto) {
        const { sizes, ...rest } = dto;
        return this.prismaService.product.create({
            data: {
                ...rest,
                sizes: { set: sizes },
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
        const { sizes, ...rest } = updateProductDto;
        return this.prismaService.product.update({
          where: { product_id: id },
          data: {
            ...rest,
          },
        });
    }
    
    async remove(id: number) {
        return this.prismaService.product.delete({
          where: { product_id: id },
        });
    }
}