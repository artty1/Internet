import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;

@Pipe({
  name: 'toAge'
})
export class ToAgePipe implements PipeTransform {

  transform(value: any): string {

    let result = '-';
    const d:any = new Date(value);

    if(!isNaN(d)){

      const currentYear = (new Date()).getFullYear();
      const diff = currentYear - d.getFullYear();

      result = diff.toString()+' ปี';
    }

    return result;
  }

}
