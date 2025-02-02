import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { baseModalDialog, DialogResult } from '../../shared/base/base-modal-dialog';
import { Consession, RequestDocument } from '../../shared/models/request-document';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { jQueryHelper } from '../../shared/helpers/jquery-helper';
import { DateConvertorService } from 'src/app/shared/helpers/date-convertor.service';


@Component({
  selector: 'cdss-popup-editor-appendix-concession',
  templateUrl: './popup-editor-appendix-concession.component.html',
  styleUrls: ['./popup-editor-appendix-concession.component.css']
})
export class PopupEditorAppendixConcession extends baseModalDialog implements OnInit, OnDestroy {


  public CMD_FOR_DATE = 'cmdConcessEditor_DocumentDate';
  public CMD_FOR_EXIREDATE = 'cmdConcessEditor_DocumentExpireDate';

  public consession: Consession = new Consession();

  public temp_date_to_note: Date;

  private jh = new jQueryHelper();

  private is_item_validate: boolean = false;


  constructor(public app:ApplicationContext, public repo:RequestDocumentService, public date_helper: DateConvertorService) {
    super();
    this.registerOnAfterViewInit(this.initCalendar);
  }
  // -------------------------------------------
  ngOnInit() {

  }
  // -------------------------------------------
  public initCalendar() {
    //this.jh.toDatePicker("cmdConcessEditor_DocumentDate", 'consession-document-date', null, (tag, data) => { this.changeDate(tag, data); });
    this.jh.toDatePicker(this.CMD_FOR_DATE, this.CMD_FOR_DATE, null, (tag, data) => { this.changeDate(tag, data); });
    this.jh.toDatePicker(this.CMD_FOR_EXIREDATE, this.CMD_FOR_EXIREDATE, null, (tag, data) => { 
      this.changeDate(tag, data); 
    });
  }
  // -------------------------------------------
  ngOnDestroy() {
    //this.jh.toDestroy_DatePicker("cmdConcessEditor_DocumentDate");
    this.jh.toDestroy_DatePicker(this.CMD_FOR_DATE);
    this.jh.toDestroy_DatePicker(this.CMD_FOR_EXIREDATE);
  }
  // -------------------------------------------
  private changeDate(tag, data) {

    if (tag == this.CMD_FOR_DATE)
    {
      this.consession.DOCUMENT_DATE = data;
    }
    else if (tag == this.CMD_FOR_EXIREDATE)
    {
      let contect_info = this.date_helper.ToLongDateString(data);
      this.consession.CONTACT_INFO = contect_info;
      this.temp_date_to_note = data;
    }

  }
  // -------------------------------------------
  public clearValidate(elid:string) {
    this.app.setValidateControl(elid, true);
  }
  // -------------------------------------------
  public openForEdit(data: Consession, callback: Function) {
    this.temp_date_to_note = null;
    this.consession = JSON.parse(JSON.stringify(data));
    this.clearAllValidate();

    console.log(this.CMD_FOR_DATE, data.DOCUMENT_DATE);


    //this.jh.setDateToDatepicker(this.CMD_FOR_DATE, data.DOCUMENT_DATE);
    this.openDialog(callback);
  }
  // -------------------------------------------
  public openForNew(callback: Function) {
    this.temp_date_to_note = null;
    this.consession = new Consession();
    this.clearAllValidate();
    this.openDialog(callback);
  }
  // -------------------------------------------
  public cancelDialog() {
    this.innerClose(false);
  }
  // -------------------------------------------
    public saveData() {

      let remark: any = document.getElementById("txtConsessionEditor_Remark");

        this.consession.CONTACT_INFO = remark.value; // this.temp_date_to_note;

      if (this.validate(this.consession, true)) {
          console.log(this.consession);
      this.innerClose(true);
    }
  }
  // -------------------------------------------
  public get IsValidate(): boolean {
    return this.is_item_validate;
  }
  // ------------------------------------------------
  public Validate(consession: Consession): boolean {
    return this.validate(consession, false);
  }
  // -------------------------------------------
  private validate(consession: Consession, is_myself_validation: boolean = false): boolean {
    let hasError: boolean = false;

    if (consession.DOCUMENT_NO == null || consession.DOCUMENT_NO.trim().length == 0) {
      hasError = true;

      if (is_myself_validation) this.app.setValidateControl('txtConsessionEditor_DocumentNO', false);
    }

    if (consession.DOCUMENT_DATE == null) {
      hasError = true;

      if (is_myself_validation) this.app.setValidateControl('txtConsessionEditor_DocumentDate', false);
    }

    //if (consession.DOCUMENT_NO == null || consession.CONTACT_INFO.trim().length == 0) {
    //  hasError = true;

    //  if (is_myself_validation) this.app.setValidateControl('txtConsessionEditor_Remark', false);
    //}
    // ---------------------------------
    if (is_myself_validation) this.is_item_validate = !hasError;
    // ---------------------------------
    return !hasError;
  }
  // ---------------------------------
  private clearAllValidate() {
    this.app.setValidateControl('txtConsessionEditor_DocumentDate', true);
    this.app.setValidateControl('txtConsessionEditor_Remark', true);
    this.app.setValidateControl('txtConsessionEditor_DocumentNO', true);
    // this.app.setValidateControl('txtConsessionEditor_ExpireDate', true);

  }
}
