import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[InputNumModel]'
})
export class InputModelDirective {

  @Output("InputNumModelChange") public modelChange: EventEmitter<number>;


  private elem: HTMLInputElement;

  private _format: any;
  private _floatingPoint: number = 3;
  private _model: number = 0;
  private _min: number = 0;
  private _max: number = 9999999999999;

  // private __tempLastValue:string = '';
  private __tempValueOfSetModel: number = 0;

  constructor(private elemR: ElementRef) {
    this.initial();
  }
  //-------------------------------------------
  private initial(){

    this.modelChange = new EventEmitter();
    this.elem = <HTMLInputElement>this.elemR.nativeElement;
    this.elem.onchange = (e)=>{
      // console.log('onchange');
      this.validateChange(e);
    }
    this.elem.onfocus = (e)=>{
      this.getFocus(e);
    }
    this.elem.onblur = (e)=>{
      this.lostFocus(e);
    }
    // this.elem.onkeydown = (e: KeyboardEvent)=>{
    //   const key:any = e.key;
    //   // if(isNaN(key)){
    //   //   e.cancelBubble =
    //   // }
    //   this.__tempLastValue = this.elem.value;
    // }
    this.elem.onkeyup = (e)=>{
      this.checkKey(e);
      // this.checkKey(e, this.__tempLastValue);
      // this.__tempLastValue = '';
    }

    if(this._model==0){
      this.model = 0;
    }
  }
  //-------------------------------------------
  //-------------------------------------------
  @Input("InputNumModel")
  public get model(): number{
    return this._model;
  }
  //-------------------------------------------
  public set model(value: number){
    this._model = value;
    this.__tempValueOfSetModel = value;
    this.redrawValue();
  }
  //-------------------------------------------
  //-------------------------------------------
  @Input("min-value")
  public get min(): number{
    return this._min;
  }
  //-------------------------------------------
  public set min(value: number){
    this._min = value;
    this.redrawValue();
  }
  //-------------------------------------------
  //-------------------------------------------
  @Input("max-value")
  public get max(): number{
    return this._max;
  }
  //-------------------------------------------
  public set max(value: number){
    this._max = value;
    this.redrawValue();
  }
  //-------------------------------------------
  //-------------------------------------------
  @Input("format")
  public get format():any{
    return this.format;
  }
  public set format(value:any){
    this.format = value;
    this.redrawValue();
  }
  //-------------------------------------------
  //-------------------------------------------
  @Input("floatPoint")
  public get floatPoint():number{
    return this._floatingPoint;
  }
  public set floatPoint(value:number){
    this._floatingPoint = (value>-1) ? value : 0;
    this.redrawValue();
  }
  //-------------------------------------------
  //-------------------------------------------
  private getFocus(event:any){
    this.elem.value = this._model.toString();
    this.elem.select();
  }
  //-------------------------------------------
  private lostFocus(event:any, withNextFocus: boolean = false){
    this.redrawValue(withNextFocus);
  }
  //-------------------------------------------
  //private checkKey(event:KeyboardEvent, lastValue:string){
  private checkKey(event:KeyboardEvent){
    // console.log('checkKey :', event);
    // console.log('current value => ', this.elem.value);


    if(event.key=="Enter"){
      // this.elem.onchange(null);
      this.validateChange(event);
      return;
    }

    // const currentAllValue:any = this.elem.value;
    // if(isNaN(currentAllValue)){
    //   console.log('reject');
    //   this.elem.value = lastValue;
    //   // event.cancelBubble = true;
    //   return;
    // }

    // console.log('key in num and no enter');
  }
  //-------------------------------------------
  private validateChange(event: any){
    const value:any = this.elem.value;

    if(isNaN(value)){
      this.redrawValue();
      return;
    }

    let dataModel = parseFloat(value);

    if(this._floatingPoint==0){
      dataModel = parseInt(dataModel.toFixed(0));
    }else{
      dataModel = parseFloat(dataModel.toFixed(this._floatingPoint));
    }

    this._model = dataModel;
    this.__tempValueOfSetModel = dataModel;
    this.modelChange.emit(dataModel);

    this.lostFocus(null, true);
    // this.redrawValue(true);
  }
  //-------------------------------------------
  private redrawValue(withNextFocus:boolean = false){
    // console.log('redrawValue');
    if(this.elem){
      this.elem.value = InputModelDirective.toQTY(this._model, this._floatingPoint);
    }

    if(withNextFocus){

      InputModelDirective.nextFocus(this.elem);
    }
  }
  //-------------------------------------------
  private static toQTY(qty: number, digit: number = 2){

    let result: string="0";

    if(qty){
      result = qty.toFixed(digit);
    }

    const parts = result.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    result = parts.join(".");

    return result;
  }
  //-------------------------------------------
  private static nextFocus(currentElem: HTMLElement){
    // console.log('nextFocus', currentElem);
    // if(currentElem.nextSibling){
    //   // console.log('nextSibling : ', currentElem.nextSibling);
    //   const nextElem:any = currentElem.nextSibling;
    //   // console.log('nextElem: ', nextElem);
    //   nextElem.focus();

    //   // currentElem.nextSibling.

    // }else{
    //   currentElem.parentElement.focus();
    // }


  }
  //-------------------------------------------
}
