import { Component, Input, OnInit } from '@angular/core';
import { baseModalDialog } from 'src/app/shared/base/base-modal-dialog';


@Component({
  selector: 'cdss-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialog extends baseModalDialog implements OnInit {

  @Input("cancel-caption") public cancelCaption: string = "Close";

  private _header: string = "พบข้อผิดพลาด";
  private _detail: Array<string> = new Array();

  constructor() {
    super();
  }
  ngOnInit() {
  }

  public openDialogWithMessage(header: string, message: Array<string>, callback: Function = null) {

    if(header.trim().length>0){
      this._header = header;
    }else{
      this._header = "พบข้อผิดพลาด";
    }

    this._detail = message;

    this.openDialog(callback);


  }

  public get MessageHeader():string{
    return this._header;
  }

  public get MessageDetail():Array<string>{
    return this._detail;
  }
}
