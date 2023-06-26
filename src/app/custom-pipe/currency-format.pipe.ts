import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    const formattedValue = value
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `Ksh. ${formattedValue}`;
  }
}
