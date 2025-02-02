import { Pipe, PipeTransform } from '@angular/core';
import { DateConvertorService } from '../helpers/date-convertor.service';

@Pipe({
  name: 'toMonthPeriod'
})
export class ToMonthPeriodPipe implements PipeTransform {

  constructor(private helper: DateConvertorService) {

  }

  transform(value: Date): string { 
    if(value==null) return '';

    return this.helper.ToMonthNameAndYear(value);
  }
}
