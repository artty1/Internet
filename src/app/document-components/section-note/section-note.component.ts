import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, SubmitInfo } from '../../shared/models/request-document';

@Component({
  selector: 'cdss-section-note',
  templateUrl: './section-note.component.html',
  styleUrls: ['./section-note.component.css']
})
export class SectionNoteComponent extends BaseSection implements OnInit {


  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService) {
    super(app, repo);
    this.title = 'หมายเหตุ : แก้ไขคำขอ';

    //console.log('SubmitInfoHistory : ', this.repo.currentDocument.SubmitInfoHistory);

    this.is_hidden = (this.repo.currentDocument.SubmitInfoHistory==null) || (this.repo.currentDocument.SubmitInfoHistory.length == 0);

  }
  //-----------------------------------------------------------
  ngOnInit() {

  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ------------------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  //-----------------------------------------------------------
  public get SubmitInfoList():Array<SubmitInfo> {
    return this.repo.currentDocument.SubmitInfoHistory;
  }
  //-----------------------------------------------------------
  public get SubmitInfoLength(): number{
    return this.repo.currentDocument.SubmitInfoHistory.length;
  }
  //-----------------------------------------------------------
  public get ApplicationContact():string{
    return this.app.Configuration.contact;
  }
  //-----------------------------------------------------------
}
