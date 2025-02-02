import { Component, Input, OnInit } from '@angular/core';
import { baseModalDialog, DialogResult } from '../../shared/base/base-modal-dialog';

@Component({
  selector: 'cdss-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialog extends baseModalDialog implements OnInit {

  public isEnableButtonOK: boolean = true;
  public isEnableButtonCancle: boolean = true;  

  @Input("show-cancel-button") public canCancelButton: boolean = true;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public submitDialog() {
    this.on_ok.emit(this.buildResult(true));
    this.innerClose(true);
  }
  public cancelDialog() {
    this.on_cancel.emit(this.buildResult(false));
    this.innerClose(false);
  }

}

