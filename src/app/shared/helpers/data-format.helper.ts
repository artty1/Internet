import { Injectable } from '@angular/core';
import { ApplicationContext } from 'src/app/application-context';

@Injectable({
  providedIn: 'root'
})

export class DataFormatHelper {

  constructor(private app: ApplicationContext) {

  }

  public toQTY(qty: number, digit: number = 2){

    let result: string="0";

    if(qty){
      result = qty.toFixed(digit);
    }

    const parts = result.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    result = parts.join(".");

    return result;
  }

}

