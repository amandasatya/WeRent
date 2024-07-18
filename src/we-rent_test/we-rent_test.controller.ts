import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeRentTestService } from './we-rent_test.service';
import { CreateWeRentTestDto } from './dto/create-we-rent_test.dto';
import { UpdateWeRentTestDto } from './dto/update-we-rent_test.dto';

@Controller('we-rent-test')
export class WeRentTestController {
  constructor(private readonly weRentTestService: WeRentTestService) {}

  @Post()
  create(@Body() createWeRentTestDto: CreateWeRentTestDto) {
    return this.weRentTestService.create(createWeRentTestDto);
  }

  @Get()
  findAll() {
    return this.weRentTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weRentTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeRentTestDto: UpdateWeRentTestDto) {
    return this.weRentTestService.update(+id, updateWeRentTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weRentTestService.remove(+id);
  }
}
