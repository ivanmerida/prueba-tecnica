import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }
  
  // formatea la fecha
  transform(value: string | Date, format: string = 'fullDate'): string | null {
    return this.datePipe.transform(value, format);
  }

}
