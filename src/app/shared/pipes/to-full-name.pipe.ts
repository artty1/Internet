import { Pipe, PipeTransform } from '@angular/core';
import { EnumToStringService } from '../helpers/enum-to-string.service';

@Pipe({
  name: 'toFullName'
})
export class ToFullNamePipe implements PipeTransform {

  constructor(private e_service:EnumToStringService){

  }
  // -------------------------------------------
  transform(firstname: string, prefix: string = '', lastname: string = '', middle: string = ''): string {
    return this.e_service.ToFullName(firstname, prefix, lastname, middle);
  }
  // -------------------------------------------
}
