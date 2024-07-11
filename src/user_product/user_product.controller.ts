/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserProductService } from './user_product.service';

@Controller('user-product')
export class UserProductController {
  constructor(private readonly userProductService: UserProductService) {}

  @Get()
  async findAll() {
    return this.userProductService.findAll();
  }

  @Get(':id/:product_id')
  async findOne(@Param('id') id: string, @Param('product_id') product_id: string) {
    return this.userProductService.findOne(+id, +product_id);
  }
}
