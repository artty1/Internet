import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[cdssOnlyNumberWithComma]'
})

export class OnlyNumberWithCommaDirective {



  constructor() { }

  @HostListener("keyup") onKeyUp(event:KeyboardEvent){

  }
}
