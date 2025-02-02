//import { Directive, ElementRef, HostListener } from '@angular/core';
//@Directive({
//  selector: '[cdssOnlyNumber]'
//})
//export class OnlyNumberDirective {
//  @HostListener('keydown', ['$event'])
//  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
//  //private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];
//  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
//  constructor(private el: ElementRef) {
//  }
//  // ------------------------------------------
//  onKeyDown(event: KeyboardEvent) {
//    // Allow Backspace, tab, end, and home keys
//    if (this.specialKeys.indexOf(event.key) !== -1) {
//      return;
//    }
//    let current: string = this.el.nativeElement.value;
//    let next: string = current.concat(event.key);
//    if (next && !String(next).match(this.regex)) {
//      event.preventDefault();
//    }
//  }
//  // ------------------------------------------
//}
//# sourceMappingURL=only-number.directive.js.map