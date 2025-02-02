import { Component, OnInit } from '@angular/core';
import { BaseSection } from './../../shared/base/base-section';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { RequestDocument, SubmitInfo } from '../../shared/models/request-document';

@Component({
  selector: 'cdss-section-trader-comment',
  templateUrl: './section-trader-comment.component.html',
  styleUrls: ['./section-trader-comment.component.css']
})
export class SectionTraderCommentComponent extends BaseSection implements OnInit {

  constructor(public app: ApplicationContext, public repo: RequestDocumentService) {
    super(app, repo);
    this.title = 'Trader Comment';
    //this.checkRequestType(this.repo.currentDocument);
  }

  ngOnInit() {
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ------------------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  public get SubmitInfoList(): Array<SubmitInfo> {
    return this.repo.currentDocument.SubmitInfoHistory;
  }

  public get Note(): string {
    return this.repo.currentDocument.NOTE1;
  }
  public set Note(value: string) {
    this.repo.currentDocument.NOTE1 = value;
  }

}
