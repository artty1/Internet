import { Component, OnInit } from '@angular/core';
import { BaseSection } from './../../shared/base/base-section';
import { ReferenceDocument, RequestDocument } from '../../shared/models/request-document';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';

@Component({
  selector: 'cdss-section-production-detail',
  templateUrl: './section-production-detail.component.html',
  styleUrls: ['./section-production-detail.component.css']
})
export class SectionProductionDetailComponent extends BaseSection implements OnInit {

  constructor(public app: ApplicationContext, public repo: RequestDocumentService) {
    super(app, repo);
    this.title = 'การขออนุญาตผลิต';
    //this.checkRequestType(this.repo.currentDocument)
  }

  ngOnInit() {
  }

  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ------------------------------------------------------
  // ----------------------------------------
  public get RefDoc():ReferenceDocument{
    return this.repo.currentDocument.ReferenceDocument;
  }
  // ----------------------------------------
}
