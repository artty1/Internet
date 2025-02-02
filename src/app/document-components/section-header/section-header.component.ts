import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';
import { BaseSection } from './../../shared/base/base-section';

import { RequestDocumentType } from './../../shared/enums/request-type.enum';

@Component({
  selector: 'cdss-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent extends BaseSection implements OnInit {

  //public Document: RequestDocument;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService) {
    super(app, repo);

    this.title = "request header";
    this.is_hidden = false;

    //this.Document = this.repo.currentDocument;

  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ------------------------------------------------------
  // ----------------------------------------
 
  // ----------------------------------------
  ngOnInit() {

  }
  // ----------------------------------------
  public get DocumentNo(): string {
    let result = '';
    if (this.repo.currentDocument.DOCUMENT_NO != null) result = this.repo.currentDocument.DOCUMENT_NO;
    return result;
  }
  // ----------------------------------------
  public get DocumentDate(): Date{
    return this.repo.currentDocument.DOCUMENT_DATE;
  }
  // ----------------------------------------
  public get ReceiveNo(): string {
    let result = '';
    if (this.repo.currentDocument.REGISTER_NO != null) result = this.repo.currentDocument.REGISTER_NO;
    return result;
  }
  // ----------------------------------------
  public get ReceiveDate(): Date {
    return this.repo.currentDocument.REGISTER_DATE;
  }
  // ----------------------------------------
  public get DocumentStatus(): string {
    let result = "";

    if(this.repo.currentDocument.ID==0){
      result = "คำขอใหม่";
    }else if (this.repo.currentDocument.SUBMIT_STATUS == 0) {
      result = "แก้ไขร่างคำขอ";
    } else if (this.repo.currentDocument.SUBMIT_STATUS == 2) {
      result = "คำขอถูกปฏิเสธ";
    }
    return result;
  }
  // ----------------------------------------
  public get RequestDocumentType(): RequestDocumentType {
    return this.repo.currentDocument.LogicOfDocument.requestType;
  }
}
