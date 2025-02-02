import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from 'src/app/application-context';
import { baseModalDialog } from 'src/app/shared/base/base-modal-dialog';

@Component({
  selector: 'cdss-popup-file-upload',
  templateUrl: './popup-file-upload.component.html',
  styleUrls: ['./popup-file-upload.component.css']
})
export class PopupFileUploadComponent extends baseModalDialog implements OnInit {

  constructor(protected app: ApplicationContext) {
    super();

    this.title = "upload เอกสารแนบอื่น ๆ";
  }

  ngOnInit() {
  }

  // public showDialog(){

  // }
  public submitFileList(){

  }
}
