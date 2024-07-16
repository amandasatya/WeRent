/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import { User } from '../authentication/user.decorator';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const { sizes,product_pictures, product_videos, ...rest} = dto;
    return this.prismaService.product.create({
      data: {
        ...rest,
        sizes: { set: sizes },
        product_pictures: product_pictures ?? null,
        product_videos: product_videos ?? null,
      
      },
    });
  }

  async uploadFile(product_id: number, base64String: string, type:  'picture' | 'video') {

    const data =  type === 'picture' ? { product_pictures: base64String } : { product_videos: base64String };
    return this.prismaService.product.update({
      where: { product_id },
      data,
    });
  }

  async downloadImage(imageUrl: string): Promise<string> {
    try {
      const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
      });

      const imagePath = path.resolve(__dirname, '..', '..', 'uploads', `${Date.now()}-image.jpg`);
      const writer = fs.createWriteStream(imagePath);

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(imagePath));
        writer.on('error', (error) => reject(error));
      });
    } catch (error) {
      throw new HttpException('Failed to download image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    return this.prismaService.product.findUnique({
      where: { product_id: id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { sizes, ...rest } = updateProductDto;
    return this.prismaService.product.update({
      where: { product_id: id },
      data: {
        ...rest,
        sizes: sizes? { set: sizes} : undefined,
      },
    });
  }

  async remove(id: number): Promise<Product> {
    return this.prismaService.product.delete({
      where: { product_id: id },
    });
  }
}