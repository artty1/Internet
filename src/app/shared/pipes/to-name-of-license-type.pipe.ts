import { Pipe, PipeTransform } from '@angular/core';
import { LicenseType } from '../enums/request-type.enum';
import { EnumToStringService } from '../helpers/enum-to-string.service';

@Pipe({
  name: 'toNameOfLicenseType'
})
export class ToNameOfLicenseTypePipe implements PipeTransform {

  constructor(private e_service:EnumToStringService){

  }
  // ---------------------------------------------
  transform(value: number, isAbbr: boolean = false): string {
    // console.log("ToNameOfLicenseTypePipe : ",value);
    return this.e_service.ToNameOfLicenseType(value, isAbbr);
  }
  // -------------------------------------------
}
