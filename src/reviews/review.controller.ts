/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, HttpCode, HttpStatus, NotFoundException, Patch, UseInterceptors, HttpException, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt_auth.guard';
import { User } from '../authentication/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':review_id/upload-picture')
  @UseInterceptors(FileInterceptor('review_pictures'))
  async uploadFileReview(
    @Param('review_id', ParseIntPipe) review_id: number,
    @UploadedFile() review_pictures: Express.Multer.File 
  ) {
    console.log('File Uploaded: ', review_pictures);

    try{
      if (!review_pictures || !review_pictures.buffer) {
        throw new HttpException('file or file buffer is undefined.', HttpStatus.BAD_REQUEST);
    }

    const base64String = review_pictures.buffer.toString('base64');
    await this.reviewService.uploadFileReview(review_id, base64String, 'picture');

    return{
      statusCode: HttpStatus.OK,
      message: 'File Image Successfully Upload.',
      data: base64String,
    };
  }
  catch (error) {
    console.error('Upload file error:', error);
    throw new HttpException(`Failed to upload file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

  @UseGuards(JwtAuthGuard)
  @Patch(':review_id/upload-video')
  @UseInterceptors(FileInterceptor('review_videos'))
  async uploadVideo(
    @Param('review_id', ParseIntPipe) review_id: number,
    @UploadedFile() review_videos: Express.Multer.File
  ) {
    console.log('File uploaded:', review_videos);

    try{
      if (!review_videos || !review_videos.buffer) {
        throw new HttpException('file or file buffer is undefined.', HttpStatus.BAD_REQUEST);
    }

    const base64String = review_videos.buffer.toString('base64');
    await this.reviewService.uploadFileReview(review_id, base64String, 'video');
    return { 
      statusCode: HttpStatus.OK,
      message: 'File uploaded successfully.',
      data: base64String,
    };
    } catch (error) {
      console.error('Upload file error:', error);
      throw new HttpException(`Failed to upload file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getReviewById(@Param('id') id: string): Promise<Review> {
    const review = await this.reviewService.getReviewById(+id);
    if(!review) {
      throw new NotFoundException("Review Not Found!");
    }
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewService.updateReview(+id, updateReviewDto);
    if (!review) {
      throw new NotFoundException("Review Not Found!");
    }
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(@Param('id') id: string): Promise<Review> {
    const review = await this.reviewService.deleteReview(+id);
    if (!review) {
      throw new NotFoundException("Review Not Found!")
    }
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':review_id/delete-picture')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Successfully deleted review picture' })
  @ApiBadRequestResponse({ status: 404, description: 'Invalid data' })
  async deletePicture(@Param('review_id', ParseIntPipe) review_id: number){
    try{
      await this.reviewService.deleteFile(review_id, 'picture');
      return{
        statusCode: HttpStatus.OK,
        message: 'Picture deleted successfully.',
        data: null,
      };
    }
    catch (error){
      console.error('Delete picture error:', error);
      throw new HttpException(`Failed to delete picture: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':review_id/delete-video')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Successfully deleted Review video' })
  @ApiBadRequestResponse({ status: 404, description: 'Invalid data' })
  async deleteVideo(@Param('review_id', ParseIntPipe) review_id: number){
    try{
      await this.reviewService.deleteFile(review_id, 'video');
      return{
        statusCode: HttpStatus.OK,
        message: 'Video deleted successfully.',
        data: null,
      };
    }
    catch(error) {
      console.error('Delete video error:', error);
      throw new HttpException(`Failed to delete video: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

