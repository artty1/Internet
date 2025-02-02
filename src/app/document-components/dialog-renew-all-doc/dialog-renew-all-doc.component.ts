import { Component, OnInit } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';

@Component({
  selector: 'cdss-dialog-renew-all-doc',
  templateUrl: './dialog-renew-all-doc.component.html',
  styleUrls: ['./dialog-renew-all-doc.component.css']
})
export class DialogRenewAllDoc extends baseModalDialog implements OnInit {

  public ref_license_no: string;
  public ref_req_no: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }
  //--------------------------------------------------------------------
  public openWithDocumentReference(license_on:string, request_doc_no:string, callback:Function) {
    this.ref_license_no = license_on;
    this.ref_req_no = request_doc_no;

    this.openDialog(callback);

  }
  //--------------------------------------------------------------------
  public renewOnly() {
    this.closeDialog("L");
  }
  //--------------------------------------------------------------------
  public renewAll() {
    this.closeDialog("R");
  }
}
