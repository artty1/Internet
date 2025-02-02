import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';
import { Person } from '../../shared/models/common';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument } from '../../shared/models/request-document';

@Component({
  selector: 'cdss-section-committee',
  templateUrl: './section-committee.component.html',
  styleUrls: ['./section-committee.component.css']
})
export class SectionCommitteeComponent extends BaseSection implements OnInit {

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService) {
    super(app, repo);
    this.title = 'ผู้มีอำนาจลงนาม';

    this.checkRequestType(this.repo.currentDocument);

  }

  ngOnInit() {
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    if (!forSubmit) return true;
    // ----------------------------------------

    let result: boolean = true;

    if (this.repo.currentDocument.PersonOfCommittee.length == 0) {
      result = false;
      this.app.setValidateControl('tbCommittee', false);

      if (isFocusToField) this.app.scrollToElement('div-section-committee');
    }
    // ----------------------------------------
    return result;
  }
  // ----------------------------------------
  
  // ----------------------------------------
  // ------------------------------------------------------
  private checkRequestType(doc: RequestDocument) {
 
    this.is_hidden = false;
  }
  // ------------------------------------------------------
  public get getPerson(): Array<Person> {
    return this.app.traderInformation.people.filter(p => p.PERSON_TYPE=='C');
  }

  //public Committees(): Array<number> {
  //  return this.repo.currentDocument.PersonOfCommittee;
  //}
  // ----------------------------------------------
  public setCommitteePerson(e) {

    let isChecked = e.target.checked;
    let value = e.target.value;

    if (isChecked) {
      this.repo.currentDocument.PersonOfCommittee.push(value);
    } else {
      this.repo.currentDocument.PersonOfCommittee = this.repo.currentDocument.PersonOfCommittee.filter(p => p!=value );
    }

    this.app.setValidateControl('tbCommittee', true);

  }
  // ----------------------------------------------
  public isCheck(id): boolean {
    return (this.repo.currentDocument.PersonOfCommittee.indexOf(id) >= 0);
  }
  // ----------------------------------------------
}
