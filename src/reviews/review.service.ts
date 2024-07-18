/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Review } from '@prisma/client';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';

import axios from 'axios';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@prisma/client';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class ReviewService {

  private s3Client: S3Client;
  private bucketName: string;
  
  constructor(private prisma: PrismaService) {

    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = process.env.AWS_BUCKET_NAME;
  }

  async createReview(data: CreateReviewDto): Promise<Review> {
    const {review_pictures, review_videos, ...rest} = data;  
    return this.prisma.review.create({
      data: {
        ...rest,
        review_pictures: review_pictures?? null,
        review_videos: review_videos?? null,
      }
    });
  }

  async uploadFileReview(review_id: number, base64String: string, type: 'picture' | 'video'){
    const buffer = Buffer.from(base64String, 'base64');
    const fileName = `${uuidv4()}-${type}`;
    const uploadResult = await this.s3Client.send(new PutObjectCommand({
      Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: type === 'picture' ? 'image/jpeg' : 'video/mp4',
    }));

    const fileUrl = `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
    const data = type === 'picture' ? { review_pictures: fileUrl } : { review_videos: fileUrl };
    
    return this.prisma.review.update({
      where: {review_id},
      data,
    });
  }

  async downloadImage(imageUrl: string): Promise<string>{
    try{
      const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'arraybuffer',
      });

      const buffer = Buffer.from(response.data, 'binary');
      return buffer.toString('base64');
    }
    catch(error) {
      throw new HttpException ('Failed to download images', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(review_id: number, type: 'picture' | 'video'){
    const reviewFile = await this.prisma.review.findUnique({
      where: {review_id},
    });

    if(!reviewFile) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    const fileUrl = type === 'picture' ? reviewFile.review_pictures : reviewFile.review_videos;

    if(!fileUrl) {
      throw new HttpException(`${type} not found`, HttpStatus.NOT_FOUND);
    }

    const fileName = fileUrl.split('/').pop();
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    }));
    
    const data = type === 'picture' ? {review_pictures: null} : {review_videos: null};
    return this.prisma.review.update({
      where: {review_id},
      data,
    });
  }

  async getReviews(): Promise<Review[]> {
    return this.prisma.review.findMany({
      include: {
        product: true,
        likes: true,
        user: true,
      }
    });
  }

  async getReviewById(review_id: number): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { review_id },
      include: {
        product: true,
        likes: true,
        user: true,
      }
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${review_id} not found`);
    }

    return review;
  }

  // async getAverageFitScaleByUserId(user_id: number): Promise<number> {
  //   const reviews = await this.prisma.review.findMany({
  //     where: { user_id },
  //     select: { fit_scale: true },
  //   });
  
  //   if (reviews.length === 0) {
  //     return 0;
  //   }
  
  //   const totalFitScale = reviews.reduce((sum, review) => {
  //     switch (review.fit_scale) {
  //       case 'Small':
  //         return sum + 1;
  //       case 'Fit':
  //         return sum + 2;
  //       case 'Large':
  //         return sum + 3;
  //       default:
  //         return sum;
  //     }
  //   }, 0);
  
  //   return totalFitScale / reviews.length;
  // }

  async getAverageFitScaleByUserId(user_id: number): Promise<{ Small: number; Fit: number; Large: number }> {
    const reviews = await this.prisma.review.findMany({
      where: { user_id },
      select: { fit_scale: true },
    });

    const fitScaleCounts = { Small: 0, Fit: 0, Large: 0 };
    const fitScaleSums = { Small: 0, Fit: 0, Large: 0 };

    reviews.forEach(review => {
      switch (review.fit_scale) {
        case 'Small':
          fitScaleCounts.Small += 1;
          fitScaleSums.Small += 1;
          break;
        case 'Fit':
          fitScaleCounts.Fit += 1;
          fitScaleSums.Fit += 2;
          break;
        case 'Large':
          fitScaleCounts.Large += 1;
          fitScaleSums.Large += 3;
          break;
      }
    });

    const averageFitScales = {
      Small: fitScaleCounts.Small > 0 ? fitScaleSums.Small / fitScaleCounts.Small : 0,
      Fit: fitScaleCounts.Fit > 0 ? fitScaleSums.Fit / fitScaleCounts.Fit : 0,
      Large: fitScaleCounts.Large > 0 ? fitScaleSums.Large / fitScaleCounts.Large : 0,
    };

    return averageFitScales;
  }
  
  async updateReview(review_id: number, data: UpdateReviewDto): Promise<Review> {
    return this.prisma.review.update({
      where: { review_id },
      data,
      include: {
        product: true,
        likes: true,
        user: true,
      },
    });
  }

  async deleteReview(review_id: number): Promise<Review> {
    await this.prisma.like.deleteMany({
      where: { review_id: review_id,},
    });

    try {
      return await this.prisma.review.delete({
        where: { review_id: review_id },
      });
    } catch (error) {
      throw new NotFoundException(`Review with id ${review_id} not found`);
    }
  }
}