/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import axios from 'axios';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@prisma/client';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';


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
        product_pictures: { set: product_pictures || []},
        product_videos: product_videos ?? null,

      },
    });
  }


  async uploadFile(product_id: number, base64Strings: string[], type: 'picture' | 'video') {
    const fileUrls: string[] = [];

    for (const base64String of base64Strings) {
      const buffer = Buffer.from(base64String, 'base64');
      const fileName = `${uuidv4()}-${type}`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: buffer,
          ContentEncoding: 'base64',
          ContentType: type === 'picture' ? 'image/jpeg' : 'video/mp4',
        }),
      );
      const fileUrl = `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
      fileUrls.push(fileUrl);
    }

    const data = type === 'picture' ? { product_pictures: { set: fileUrls } } : { product_videos: fileUrls[0] };

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


  async deleteFile(product_id: number, type: 'picture' | 'video') {
     const productFile = await this.prismaService.product.findUnique({
      where: { product_id },
    });

    if (!productFile) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    const fileUrls = type === 'picture' ? productFile.product_pictures : [productFile.product_videos];
    for (const fileUrl of fileUrls) {
      const fileName = fileUrl.split('/').pop();
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
        }),
      );
    }

    const data = type === 'picture' ? { product_pictures: { set: [] } } : { product_videos: null };
    return this.prismaService.product.update({
      where: { product_id },
      data,
    });
  }


  async findAll() {
    return this.prismaService.product.findMany({
      where: { deletedAt: null },
      include: {
        ratings: true,
        reviews: true,
      },
    });
  }

  async findOne(product_id: number): Promise<Product> {
    const products = await this.prismaService.product.findUnique({
      where: {
        product_id: product_id,
        deletedAt: null,
      },
      include: {
        ratings: true,
        reviews: true,
      }
    });

    if (!products) {
      throw new NotFoundException(`Review with id ${product_id} not found`);
    }

    return products;
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
    return this.prismaService.product.update({
      where: { product_id: id },
      data: { deletedAt: new Date() },
    });
  }
}