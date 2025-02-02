import { Pipe, PipeTransform } from '@angular/core';
import { EnumToStringService } from '../helpers/enum-to-string.service';

@Pipe({
  name: 'toChannelName'
})
export class ToChannelNamePipe implements PipeTransform {

  constructor(private e_service:EnumToStringService){
    
  }
  // -------------------------------------------
  transform(value: boolean): string {
    return this.e_service.ToChanalName(value);
  }
  // -------------------------------------------
}
