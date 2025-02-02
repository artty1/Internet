import { Component, OnInit, Input } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';

@Component({
  selector: 'cdss-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialog extends baseModalDialog implements OnInit {

  @Input('show-ok') public isShowOK: boolean = true;
  @Input("cancel-caption") public cancelCaption: string = "Cancel";

  @Input("Message") message: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }


}
