import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';
import { Person } from '../../shared/models/common';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument } from '../../shared/models/request-document';

@Component({
  selector: 'cdss-section-attorney',
  templateUrl: './section-attorney.component.html',
  styleUrls: ['./section-attorney.component.css']
})
export class SectionAttorneyComponent extends BaseSection implements OnInit {

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService) {
    super(app, repo);
    this.title = 'ผู้รับมอบอำนาจ';
    //this.checkRequestType(this.repo.currentDocument)
  }
  // ----------------------------------------------
  ngOnInit() {
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ----------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  public get getPerson(): Array<Person> {
    return this.app.traderInformation.people.filter(p => p.PERSON_TYPE == 'A');
  }
  // ----------------------------------------------
  public setCommitteePerson(e, person: Person) {

    const id = person.ID;
    let isChecked = e.target.checked;
    this.repo.currentDocument.PersonOfAttorney.length = 0;

    if (isChecked) {
      this.repo.currentDocument.PersonOfAttorney.push(id);
    }

    this.app.setValidateControl('tbAttorney', true);

    let checkList:any = document.querySelectorAll('input[name="attorny-person"]');
    for(let i=0; i<checkList.length; i++){
      checkList[i].checked = (checkList[i].value==id);
    }

    // console.log('PersonOfAttorney : ', this.repo.currentDocument.PersonOfAttorney);

  }
  // ----------------------------------------------
  public isCheck(id): boolean {
    return (this.repo.currentDocument.PersonOfAttorney.indexOf(id) >= 0);
  }
  // ----------------------------------------------

}
