import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
 selector: 'input[cdssOnlyNumber]'
})
export class OnlyNumberDirective {

    private minvalue:number = 0;
    private maxvalue:number = 9999999;

    // --------------------------------------
    constructor(private el: ElementRef) {
        // console.log("OnlyNumberDirective Constructor : ", el);
    }
    // --------------------------------------
    @Input("min") 
    public get min():number{
        return this.minvalue;
    }
    public set min(value:number){
        this.minvalue = value;
    }
    // --------------------------------------
    @Input("max") 
    public get max():number{
        return this.maxvalue;
    }
    public set max(value:number){
        this.maxvalue = value;
    }
    // --------------------------------------
    @HostListener("keyup", ["$event"]) onKeyUp(event:KeyboardEvent){

        // console.log("minvalue : ", this.minvalue);
        // console.log("maxvalue : ", this.maxvalue);

        if(event.which >= 37 && event.which <= 40) return;
    
        // console.log('this.el.nativeElement.value : ', this.el.nativeElement.value);
        
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // let data:number = Number.parseInt(this.el.nativeElement.value.replace(/\D/g, ""));

        
        // this.el.nativeElement.value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // console.log("data : ", data);
        // // let data = this.el.nativeElement.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // if(data<this.minvalue){
        //     console.log('data<this.minvalue');
        //     data = this.minvalue;
        // }else if(data>this.maxvalue){
        //     console.log('data>this.maxvalue');
        //     data = this.maxvalue;
        // }

        // if(isNaN(data)) data = 0;
        //console.log("data.toString() : ", data, data.toString());

        // this.el.nativeElement.value = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    // --------------------------------------
}
