import { Component, OnInit } from '@angular/core';
import { BaseSection } from './../../shared/base/base-section';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { RequestDocument } from '../../shared/models/request-document';


@Component({
  selector: 'cdss-section-reason-of-substitute',
  templateUrl: './section-reason-of-substitute.component.html',
  styleUrls: ['./section-reason-of-substitute.component.css']
})
export class SectionReasonOfSubstituteComponent extends BaseSection implements OnInit {

  constructor(public app: ApplicationContext, public repo: RequestDocumentService) {
    super(app,repo);
    this.title = 'เหตุผลในการขอใบแทน';

    //this.checkRequestType(this.repo.currentDocument);

  }
  //-------------------------------------------
  ngOnInit() {

  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ------------------------------------------------------
  // ----------------------------------------
 
  // ----------------------------------------

}
