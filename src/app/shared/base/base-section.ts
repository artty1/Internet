import { Input, Output, HostBinding, EventEmitter, AfterViewInit } from '@angular/core';
import { RequestDocumentService } from './../../shared/services/request-document.service';
import { ApplicationContext } from '../../application-context';

//------------------------------------------------------
export abstract class BaseSection implements AfterViewInit  {

  @Output("ready") on_ready: EventEmitter<any> = new EventEmitter();
  @Input("validator-order") v_order: number = 0;

  private callbackViewInit: Function = null;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService) {

  }
  //------------------------------------------------------
  ngAfterViewInit() {
    // console.log(this.title, ' ready !!!!');
    if (this.callbackViewInit != null) this.callbackViewInit();
    this.on_ready.emit(this);
  }
  //------------------------------------------------------
  protected title: string = "default title";

  @Input("Title")
  public get Title(): string {
    return this.title;
  }
  public set Title(value: string) {
    if (value.trim().length>0) this.title = value;
  }
  //------------------------------------------------------
  @HostBinding('hidden') is_hidden: boolean = false;

  //------------------------------------------------------
  public get IsViewMode(): boolean {
    return false;
  }
  public get hasReference(): boolean {
    return true;
  }
    //------------------------------------------------------
  //public get IsHidden(): boolean {
  //  console.log('is hidden : ', this.is_hidden);
  //  return this.is_hidden;
  //}
  //------------------------------------------------------
  public abstract Validate(forSubmit: boolean, isFocusToField: boolean): boolean;
  //------------------------------------------------------
  public clearValidate(elID) {
    // console.log('clearValidate : ', elID);
    this.app.setValidateControl(elID, true);
  }
  //------------------------------------------------------
  protected registerOnAfterViewInit(callback: Function) {
    this.callbackViewInit = callback;
  }
  //------------------------------------------------------

}
