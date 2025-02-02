import { Pipe, PipeTransform } from '@angular/core';
import { EnumToStringService } from '../helpers/enum-to-string.service';

@Pipe({
  name: 'toFullAddress'
})
export class ToFullAddressPipe implements PipeTransform {

  constructor(private e_service:EnumToStringService){

  }
  // -------------------------------------------
  transform(no: string, building:string, moo: string, soi: string, street: string, sub_district: string, district: string, province: string, postcode: string): string {
    return this.e_service.ToFullAddress(no, building, moo, soi, street, sub_district, district, province, postcode);
  }

}
