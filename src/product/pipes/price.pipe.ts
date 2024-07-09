import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import currencyFormatter from 'currency-formatter';

@Injectable()
export class PricePipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    return currencyFormatter.format(value, { code: 'IDR' });
  }
}