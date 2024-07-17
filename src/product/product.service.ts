/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import axios from 'axios';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


dotenv.config()
@Injectable()
export class ProductService {

  private s3Client: S3Client;
  private bucketName: string;


  constructor(private prismaService: PrismaService) {
    
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = process.env.AWS_BUCKET_NAME;
  }

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


  async uploadFile(product_id: number, base64String: string, type: 'picture' | 'video') {
    const buffer = Buffer.from(base64String, 'base64');
    const fileName = `${uuidv4()}-${type}`;
    const uploadResult = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: type === 'picture' ? 'image/jpeg' : 'video/mp4',
      }),
    );

    const fileUrl = `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
    const data = type === 'picture' ? { product_pictures: fileUrl } : { product_videos: fileUrl };

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
        responseType: 'arraybuffer',
      });

      const buffer = Buffer.from(response.data, 'binary');
      return buffer.toString('base64');
    } catch (error) {
      throw new HttpException('Failed to download image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return this.prismaService.product.findMany({
      include: {
        ratings: true,
        reviews: true,
      }
    });
  }

  async findOne(id: number): Promise<Product> {
    return this.prismaService.product.findUnique({
      where: { product_id: id },
      include: {
        ratings: true,
        reviews: true,
      }
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