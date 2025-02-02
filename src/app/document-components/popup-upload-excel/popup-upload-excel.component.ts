import { Component, OnInit } from '@angular/core';
import { baseModalDialog, DialogResult } from '../../shared/base/base-modal-dialog';

import * as XLSX from 'xlsx';
import { Appendix } from '../../shared/models/request-document';

@Component({
  selector: 'cdss-popup-upload-excel',
  templateUrl: './popup-upload-excel.component.html',
  styleUrls: ['./popup-upload-excel.component.css']
})
export class PopupUploadExcel extends baseModalDialog implements OnInit {
  private data: Array<Appendix>;
  // ------------------------------------------------
  constructor() {
    super();
  }
  // ------------------------------------------------
  ngOnInit() {
  }
  // ------------------------------------------------
  public updateAppendix() {
    this.innerClose(true);
  }
  // ------------------------------------------------
  public closeDialog() {
    this.innerClose(false);
  }
  // ------------------------------------------------
  public get formID(): string {
    return 'f-' + this.id;
  }
  // ------------------------------------------------
  public showDialogBrowser() {
    //document.getElementById("excelUpload").click();
    let f: any = document.getElementById(this.formID);
    let uploadFile = f.elements[0];

    uploadFile.value = null;
    uploadFile.click();

    //console.log('showDialogBrowser of '+ this.formID);
  }
  // ------------------------------------------------
  public onFileChange(evt: any) {
    //console.log('onFileChange');
    this.data = null;

    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });


      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      let header_option = 1;
      let xlsData = XLSX.utils.sheet_to_json(ws, { raw: false, header: header_option });

      console.log('xlsData : ', xlsData);
      
      this.innerClose(xlsData);

    };

    reader.readAsBinaryString(target.files[0]);
    //https://www.npmjs.com/package/xlsx
  }
  // ------------------------------------------------
  // ------------------------------------------------

}
