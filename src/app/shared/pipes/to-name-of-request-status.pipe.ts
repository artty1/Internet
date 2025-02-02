import { Pipe, PipeTransform } from '@angular/core';
import { DocumentStatus } from '../enums/document-status.enum';
import { EnumToStringService } from '../helpers/enum-to-string.service';

@Pipe({
  name: 'toNameOfRequestStatus'
})
export class ToNameOfRequestStatusPipe implements PipeTransform {

  constructor(private e_service:EnumToStringService){

  }
  // -------------------------------------------
  transform(value: number): string {
    return this.e_service.ToNameOfRequestStatus(value);
  }
  // -------------------------------------------
}
