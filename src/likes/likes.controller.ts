import { Controller, Post, Delete, Get, Param, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { LikeService } from './likes.service';
import { CreateLikeDto } from './dto/like-create.dto';
import { DeleteLikeDto } from './dto/like-delete.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt_auth.guard';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createLikeDto: CreateLikeDto) {
    try {
      return await this.likeService.createLike(createLikeDto.user_id, createLikeDto.review_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Body() deleteLikeDto: DeleteLikeDto) {
    try {
      return await this.likeService.removeLike(deleteLikeDto.user_id, deleteLikeDto.review_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('review/:reviewId')
  findByReview(@Param('reviewId') reviewId: string) {
    return this.likeService.getLikesByReview(+reviewId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.likeService.getLikesByUser(+userId);
  }
}
