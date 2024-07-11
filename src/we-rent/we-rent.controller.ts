import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeRentService } from './we-rent.service';
import { CreateWeRentDto } from './dto/create-we-rent.dto';
import { UpdateWeRentDto } from './dto/update-we-rent.dto';

@Controller('we-rent')
export class WeRentController {
  constructor(private readonly weRentService: WeRentService) {}

  @Post()
  create(@Body() createWeRentDto: CreateWeRentDto) {
    return this.weRentService.create(createWeRentDto);
  }

  @Get()
  findAll() {
    return this.weRentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weRentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeRentDto: UpdateWeRentDto) {
    return this.weRentService.update(+id, updateWeRentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weRentService.remove(+id);
  }
}
