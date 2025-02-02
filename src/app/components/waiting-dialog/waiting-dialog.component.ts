import { Component, OnInit } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';

@Component({
  selector: 'cdss-waiting-dialog',
  templateUrl: './waiting-dialog.component.html',
  styleUrls: ['./waiting-dialog.component.css']
})
export class WaitingDialog extends baseModalDialog implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
