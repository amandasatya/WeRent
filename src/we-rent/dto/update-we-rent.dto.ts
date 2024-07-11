import { PartialType } from '@nestjs/swagger';
import { CreateWeRentDto } from './create-we-rent.dto';

export class UpdateWeRentDto extends PartialType(CreateWeRentDto) {}
