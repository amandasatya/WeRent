import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserProductService } from './user_product.service';
import { CreateUserProductDto } from './dto/user_product.dto';

@Controller('user-product')
export class UserProductController {
  constructor(private readonly userProductService: UserProductService) {}

  @Post()
  create(@Body() createUserProductDto: CreateUserProductDto) {
    return this.userProductService.create(createUserProductDto);
  }

  @Get()
  findAll() {
    return this.userProductService.findAll();
  }

  @Get(':user_id/:product_id')
  findOne(@Param('user_id') user_id: string, @Param('product_id') product_id: string) {
    return this.userProductService.findOne(+user_id, +product_id);
  }

  @Delete(':user_id/:product_id')
  remove(@Param('user_id') user_id: string, @Param('product_id') product_id: string) {
    return this.userProductService.remove(+user_id, +product_id);
  }
}