import { PartialType } from '@nestjs/swagger';
import { CreateWeRentTestDto } from './create-we-rent_test.dto';

export class UpdateWeRentTestDto extends PartialType(CreateWeRentTestDto) {}
