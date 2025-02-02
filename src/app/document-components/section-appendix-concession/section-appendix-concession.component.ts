import { Component, OnInit } from '@angular/core';
import { EventResult } from '../../shared/models/result';
import { PopupEditorAppendixConcession } from '../popup-editor-appendix-concession/popup-editor-appendix-concession.component';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
//import { LookupService } from '../../shared/services/lookup.service';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, Consession } from '../../shared/models/request-document';
import { DownloadService } from '../../shared/services/download.service';
import { PopupUploadExcel } from '../popup-upload-excel/popup-upload-excel.component';
import { DialogResult } from '../../shared/base/base-modal-dialog';
import { PopupListExcelAppendixConsession } from '../popup-list-excel-appendix-consession/popup-list-excel-appendix-consession.component';
import { UnitService } from '../../shared/services/lookup/unit.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.hepler';

@Component({
  selector: 'cdss-section-appendix-concession',
  templateUrl: './section-appendix-concession.component.html',
  styleUrls: ['./section-appendix-concession.component.css']
})
export class SectionAppendixConcessionComponent extends BaseSection implements OnInit {

  private editor: PopupEditorAppendixConcession;
  private popupExcel: PopupUploadExcel;
  private popupList: PopupListExcelAppendixConsession;

  private excel: ExcelHelper;

  //constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService, protected download: DownloadService) {
  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected download: DownloadService) {
    super(app, repo);

    this.title = 'ผนวกประทานบัตร';
    this.excel = new ExcelHelper();
    //this.checkRequestType(this.repo.currentDocument);
  }
  //-----------------------------------------------------------
  ngOnInit() {

  }
  //-----------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    let isok: boolean = true;
    // ---------------------------------
    this.ConsessionList.forEach((item, index) => {
      let row_ok = this.editor.Validate(item);
      this.app.setValidateControl(this.TRID(index), row_ok);
      console.log("isok, row_ok : ", isok, row_ok);
      isok = isok && row_ok;
    });
    // ---------------------------------

    if (!isok && isFocusToField) this.app.scrollToElement('div-section-concession');

    return isok;

  }
  // ----------------------------------------
  // public downloadTemplate() {
  //   this.download.templateOfConsession();
  // }
  // ----------------------------------------
  public initPopup(arg: DialogResult) {

    if (arg.sender.tag == "excel") {
      this.popupExcel = arg.sender;
    } else if (arg.sender.tag == "editor") {
      this.editor = arg.sender;
    } else if (arg.sender.tag == "list") {
      this.popupList = arg.sender;
    }

  }
  //-----------------------------------------------------------
  public newData() {
    this.editor.openForNew((result: DialogResult) => {
      if (result.data == true) this.repo.currentDocument.Consessions.push(this.editor.consession);
    });
  }
  //-----------------------------------------------------------
  public editConsession(item:Consession) {

    this.editor.openForEdit(item, (result: DialogResult) => {
      if (result.data == true) {

        let idx = this.repo.currentDocument.Consessions.indexOf(item);
        if (idx > -1) this.repo.currentDocument.Consessions[idx] = this.editor.consession;

      }
    });
  }
  //-----------------------------------------------------------
  public updateExcel() {
    this.popupExcel.openDialog((result: DialogResult) => {
      if (result.data != false) {

        this.popupList.showData(result.data, (listResult:DialogResult) => {

          if (listResult.data != false) {

            if (this.repo.currentDocument.Consessions == null) {
              this.repo.currentDocument.Consessions = new Array();
            }

            // ----------------------------------
            this.repo.currentDocument.Consessions.push(...listResult.data);

          }

        })
      }
    });
  }
  //-----------------------------------------------------------
  public TRID(index) {
    return "tr-consession-"+index;
  }
  //-----------------------------------------------------------
  public get Footer(): string {
    return "";
  }
  //-----------------------------------------------------------
  public get ConsessionList(): Array<Consession> {
    return this.repo.currentDocument.Consessions;
  }
  //-----------------------------------------------------------
  public deleteConsession(item) {
    this.repo.currentDocument.Consessions = this.repo.currentDocument.Consessions.filter(a => a != item);
  }
  //---------------------------------------------------------------------------
  public exportToExcel() {
    const header = [ "เลขที่ประทานบัตร", "ลงวันที่", "หมายเหตุ (วันหมดอายุ)" ];
    const data = this.ConsessionList.map((item: Consession)=>{
      return [ item.DOCUMENT_NO, item.DOCUMENT_DATE, item.CONTACT_INFO];
    });

    // const firstHeader = [ "ตัวอย่างการใส่ข้อมูล ในช่องลงวันที่ให้ใส่เป็นรูปแบบวันที่ 'mm/dd/yyyy' ตัวอย่าง 01/31/2023 และในช่องหมายเหตุ(วันหมดอายุ) ให้ใส่ในรูปแบบวันที่ '31 มกราคม 2566'" ];
    // this.excel.toFile( data, [ firstHeader, header ], 'concession');

    this.excel.toFile( data, [ this.EXCEL_HEADER_CONSESSION, header ], 'concession');

  }
  //---------------------------------------------------------------------------
  private EXCEL_HEADER_CONSESSION = [ "ตัวอย่างการใส่ข้อมูล ในช่องลงวันที่ให้ใส่เป็นรูปแบบวันที่ 'mm/dd/yyyy' ตัวอย่าง 01/31/2023 และในช่องหมายเหตุ(วันหมดอายุ) ให้ใส่ในรูปแบบวันที่ '31 มกราคม 2566'" ];
}
