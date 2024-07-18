import { Injectable } from '@nestjs/common';
import { CreateWeRentTestDto } from './dto/create-we-rent_test.dto';
import { UpdateWeRentTestDto } from './dto/update-we-rent_test.dto';

@Injectable()
export class WeRentTestService {
  create(createWeRentTestDto: CreateWeRentTestDto) {
    return 'This action adds a new weRentTest';
  }

  findAll() {
    return `This action returns all weRentTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weRentTest`;
  }

  update(id: number, updateWeRentTestDto: UpdateWeRentTestDto) {
    return `This action updates a #${id} weRentTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} weRentTest`;
  }
}
