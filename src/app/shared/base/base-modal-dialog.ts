import { EventEmitter, Output, AfterViewInit, Input, OnInit, OnDestroy } from "@angular/core";
//import { EventResult } from '../models/result';

declare var $: any;

export abstract class baseModalDialog implements OnInit, AfterViewInit, OnDestroy {


  @Input("tag") tag: string;
  @Input("title") title: string = "ระบบยื่นคำขออนุญาตฯ ผ่านอินเตอร์เน็ต";

  @Output("ready") on_ready: EventEmitter<DialogResult> = new EventEmitter();
  @Output("command") on_command: EventEmitter<DialogResult> = new EventEmitter();
  @Output("open") on_open: EventEmitter<DialogResult> = new EventEmitter();
  @Output("close") on_close: EventEmitter<DialogResult> = new EventEmitter();
  @Output("cancel") on_cancel: EventEmitter<DialogResult> = new EventEmitter();
  @Output("ok") on_ok: EventEmitter<DialogResult> = new EventEmitter();

  public id: string;
  private tagID: string;
  public allowEscape: boolean = true;
  protected callbackClose: Function;

  private callbackViewInit: Function = null;
  //--------------------------------------------
  constructor() {
    this.id = "cdss-dialog-" + Math.round(Math.random() * 1000000);
    this.tagID = "#" + this.id;
  }
  //--------------------------------------------
  ngOnInit() {

  }
  //--------------------------------------------
  ngOnDestroy() {
    this.destroyDialog();
  }
  //--------------------------------------------
  ngAfterViewInit() {
    if (this.callbackViewInit != null) this.callbackViewInit();
    this.on_ready.emit(this.buildResult());
  }
  //------------------------------------------------------
  protected registerOnAfterViewInit(callback: Function) {
    this.callbackViewInit = callback;
  }
  //--------------------------------------------
  public openDialog(callback: Function = null) {

    if (callback) this.callbackClose = callback;

    this.setDisplayDialog(true);

    this.on_open.emit(this.buildResult());

  }
  //--------------------------------------------
  protected innerClose(data: any = null) {
    let result = this.buildResult(data);

    this.setDisplayDialog(false);
    if (this.callbackClose) this.callbackClose(result);

    this.on_close.emit(result);
  }
  //--------------------------------------------
  public cancelDialog() {
    this.innerClose(false);
    this.on_cancel.emit(this.buildResult(false));
  }
  //--------------------------------------------
  public closeDialog(data: any = null) {
    this.innerClose(data);
  }
  //--------------------------------------------
  protected buildResult(data: any = null): DialogResult {
    let result = new DialogResult();

    result.sender = this;
    result.data = data;

    return result;
  }
  //--------------------------------------------
  private destroyDialog() {
    $(this.tagID).modal('dispose');
    //console.log('destroy dialog : ', this.tagID, ' : ', this.title);
  }

  private setDisplayDialog(isShow: boolean) {

    let command: string = isShow ? 'show' : 'hide';
    //console.log('command : ', isShow);
    $(this.tagID).modal(command);

    setTimeout(() => {

      let isDialogShow = $(this.tagID).hasClass('show');

        if (!isShow && isDialogShow) {
          this.commandAgain(false);
        }

    }, 1000);

  }
  //--------------------------------------------
  private commandAgain(isShow:boolean) {
    this.setDisplayDialog(isShow);
  }
  //--------------------------------------------
  public closeAllDialog() {
    $(".modal").modal('hide');
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");
    $("body").removeAttr('style');
  }
  //--------------------------------------------
}
//--------------------------------------------
export class DialogResult {
  public sender: any;
  public data: any;
}
//--------------------------------------------
