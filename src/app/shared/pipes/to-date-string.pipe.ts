import { Pipe, PipeTransform } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { DateConvertorService } from '../helpers/date-convertor.service';

//import * as moment from 'moment';
declare var moment: any;

@Pipe({
  name: 'toDateString'
})
export class ToDateStringPipe implements PipeTransform {

  //constructor(private app: ApplicationContext) {
  constructor(private helper: DateConvertorService) {

  }
  //----------------------------------------------
  transform(value: Date, manualFormat: string = "D MMM YYYY"): string {

    if(value==null) return '';

    return this.helper.ToDateString(value, manualFormat);

  }
  // -------------------------------------------
}
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

@Pipe({
  name: 'toDateStringDash'
})
export class ToDateStringDashPipe implements PipeTransform {

  constructor(private helper: DateConvertorService) {

  }
  //----------------------------------------------
  transform(value: Date, manualFormat: string = "D MMM YYYY"): string {

    if(value==null) return '-';

    return this.helper.ToDateString(value, manualFormat);

  }
  // -------------------------------------------
}

// @Pipe({
//   name: 'toDateTimeString'
// })
// export class ToDateTimeStringPipe implements PipeTransform {

//   constructor(private helper: DateConvertorService) {

//   }
//   //----------------------------------------------
//   transform(value: Date, manualFormat: string = "D MMM YYYY"): string {

//     if(value==null) return '';

//     return this.helper.ToDateString(value, manualFormat);

//   }
//   // -------------------------------------------
// }
