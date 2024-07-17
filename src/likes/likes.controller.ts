import { Controller, Post, Delete, Get, Param, Body, BadRequestException, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LikeService } from './likes.service';
import { CreateLikeDto } from './dto/like-create.dto';
import { DeleteLikeDto } from './dto/like-delete.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt_auth.guard';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLikeDto: CreateLikeDto) {
    try {
      return await this.likeService.createLike(createLikeDto.user_id, createLikeDto.review_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Body() deleteLikeDto: DeleteLikeDto) {
    try {
      return await this.likeService.removeLike(deleteLikeDto.user_id, deleteLikeDto.review_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('review/:reviewId')
  @HttpCode(HttpStatus.OK)
  findByReview(@Param('reviewId') reviewId: string) {
    return this.likeService.getLikesByReview(+reviewId);
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  findByUser(@Param('userId') userId: string) {
    return this.likeService.getLikesByUser(+userId);
  }
}
