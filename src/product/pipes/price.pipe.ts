import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import currencyFormatter from 'currency-formatter';

@Injectable()
export class PricePipe implements PipeTransform<number, string> {
  transform(value: number, metadata: ArgumentMetadata): string {
    if (isNaN(value)) {
      throw new BadRequestException('Invalid price');
    }

    return currencyFormatter.format(value, { code: 'IDR' });
  }
}