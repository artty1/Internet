import { Pipe, PipeTransform } from '@angular/core';
import { RequestDocumentType } from '../enums/request-type.enum';
import { EnumToStringService } from '../helpers/enum-to-string.service';

@Pipe({
  name: 'toNameOfRequestDocumentType'
})
export class ToNameOfRequestDocumentTypePipe implements PipeTransform {

  constructor(private e_service: EnumToStringService){

  }
  // ------------------------------------------------------
  transform(value: number, isAbbr: boolean = false): string {
    
    return this.e_service.ToNameOfRequestDocumentType(value, isAbbr);
  }
  // -------------------------------------------
}
