import { Pipe, PipeTransform } from '@angular/core';
import { DataFormatHelper } from '../helpers/data-format.helper';

@Pipe({
  name: 'toQTY'
})
export class ToQTYPipe implements PipeTransform {

  constructor(private convertor: DataFormatHelper){

  }

  transform(value: number, unit_name: string = "", defaultOutputIfZero = null): string {

    let result: string = this.convertor.toQTY(value, 3);

    // if(unit_name.length>0) result+=" "+unit_name;

    if(value==0 && defaultOutputIfZero!=null){
      return defaultOutputIfZero;
    }

    if(!unit_name) unit_name = "";

    if(unit_name.length>0) result+=" "+unit_name;

    return result;

  }

}

@Pipe({
  name: 'toMoney'
})
export class ToMoneyPipe implements PipeTransform {

  constructor(private convertor: DataFormatHelper){

  }

  transform(value: number, unit_name: string = ""): string {

    let result: string = this.convertor.toQTY(value, 2);

    if(unit_name.length>0) result+=" "+unit_name;

    return result;

  }

}

@Pipe({
  name: 'toWeight'
})
export class ToWeightPipe implements PipeTransform {

  constructor(private convertor: DataFormatHelper){

  }

  transform(value: number, unit_name: string = ""): string {

    let result: string = this.convertor.toQTY(value, 2);

    if(unit_name.length>0) result+=" "+unit_name;

    return result;

  }

}
