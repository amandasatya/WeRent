/* eslint-disable prettier/prettier */
import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { LikeService } from './likes.service';
import { CreateLikeDto } from './dto/like-create.dto';
import { DeleteLikeDto } from './dto/like-delete.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.createLike(createLikeDto.user_id, createLikeDto.review_id);
  }

  @Delete()
  remove(@Body() deleteLikeDto: DeleteLikeDto) {
    return this.likeService.removeLike(deleteLikeDto.user_id, deleteLikeDto.review_id);
  }

  @Get('review/:reviewId')
  findByReview(@Param('reviewId') review_id: string) {
    return this.likeService.getLikesByReview(+review_id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') user_id: string) {
    return this.likeService.getLikesByUser(+user_id);
  }
}
