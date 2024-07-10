/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateWeRentDto } from './dto/create-we-rent.dto';
import { UpdateWeRentDto } from './dto/update-we-rent.dto';

@Injectable()
export class WeRentService {
  create(createWeRentDto: CreateWeRentDto) {
    return 'This action adds a new weRent';
  }

  findAll() {
    return `This action returns all weRent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weRent`;
  }

  update(id: number, updateWeRentDto: UpdateWeRentDto) {
    return `This action updates a #${id} weRent`;
  }

  remove(id: number) {
    return `This action removes a #${id} weRent`;
  }
}
