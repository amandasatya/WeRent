import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserProductService } from './user_product.service';
import { CreateUserProductDto } from './dto/user_product.dto';

@Controller('user-product')
export class UserProductController {
  constructor(private readonly userProductService: UserProductService) {}

  @Get(':id/:product_id')
  async findOne(@Param('id') id: string, @Param('product_id') product_id: string) {
    return this.userProductService.findOne(+id, +product_id);
  }

  @Delete(':id/:product_id')
  async remove(@Param('id') id: string, @Param('product_id') product_id: string) {
    return this.userProductService.remove(+id, +product_id);
  }
}
