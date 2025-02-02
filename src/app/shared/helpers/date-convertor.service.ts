import { Injectable } from '@angular/core';
import { ApplicationContext } from 'src/app/application-context';

declare var moment: any;

@Injectable({
  providedIn: 'root'
})


export class DateConvertorService {

  constructor(protected app:ApplicationContext) {

  }
  // ---------------------------------------------------
  public ToServerFormat(d:Date):string{
    let result = moment(d).format();
    return result; 
  }
  // ---------------------------------------------------
  public ToDateString(d:Date, manualFormat: string = "D MMM YYYY"):string{
    let result = '';
    
    //console.log('ToDateString : ', d);

    if (this.app.getCurrentLanguage === 'th') {
      result = moment(d).add(543, 'years').format(manualFormat);
    } else {
      result = moment(d).format(manualFormat);
    }
    return result;
  }
  // ---------------------------------------------------
  public ToLongDateString(d:Date):string{
    return this.ToDateString(d, "D MMMM YYYY");
  }
  // ---------------------------------------------------
  public ToShortDateString(d:Date):string{
    return this.ToDateString(d, "DD/MM/YYYY");
  }
  // ---------------------------------------------------
  public ToMonthNameAndYearWithParameter(month:number, year:number){
    let d:Date = new Date(year, month-1, 1);
    return this.ToMonthNameAndYear(d);
  }
  // ---------------------------------------------------
  public ToMonthNameAndYear(d:Date){
    return this.ToDateString(d, "MMMM YYYY");
  }
  // ---------------------------------------------------
  // public toDateWithoutTimezone(d: Date): Date{

  //   // let result: Date = new Date();

  //   if(d==null) return null;

  //   const ss = d.toISOString();


  //   return new Date(ss);



  //   // return result;

  // }
}
