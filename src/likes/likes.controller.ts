import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { LikeService } from './likes.service';
import { CreateLikeDto } from './dto/like-create.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.createLike(createLikeDto.user_id, createLikeDto.review_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.removeLike(+id);
  }

  @Get('review/:reviewId')
  findByReview(@Param('reviewId') reviewId: string) {
    return this.likeService.getLikesByReview(+reviewId);
  }
}
