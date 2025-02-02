import { Component, OnInit } from '@angular/core';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, ReferenceDocument } from '../../shared/models/request-document';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentType } from '../../shared/enums/request-type.enum';

@Component({
  selector: 'cdss-section-permission-production',
  templateUrl: './section-permission-production.component.html',
  styleUrls: ['./section-permission-production.component.css']
})
export class SectionPermissionProductionComponent extends BaseSection implements OnInit {

  public DocRef: ReferenceDocument;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService) {
    super(app, repo);

    this.DocRef = this.repo.currentDocument.ReferenceDocument;

    this.title = 'การขออนุญาตผลิต';
    //this.checkRequestType(this.repo.currentDocument)

    console.log('DocRef : ', this.DocRef);
  }

  ngOnInit() {
  }

  // ------------------------------------------------------
  //public clearValidate(elID) {
  //  this.app.setValidateControl(elID, true);
  //}
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    let result: boolean = true;
    let scrollToEL: string = '';
    let doc = this.repo.currentDocument.ReferenceDocument;

    if (doc.CAPACITY_QUANTITY_MAX == null) doc.CAPACITY_QUANTITY_MAX = 0;
    if (doc.CAPACITY_QUANTITY_MIN == null) doc.CAPACITY_QUANTITY_MIN = 0;
    if (doc.CAPACITY_QUANTITY_AVG == null) doc.CAPACITY_QUANTITY_AVG = 0;
    if (doc.ACTUAL_QUANTITY == null) doc.ACTUAL_QUANTITY = 0;

    //--------------------------------------------
    if (!forSubmit) {
      return true;
    }
    //--------------------------------------------
    if (doc.CAPACITY_QUANTITY_MAX < 1) {
      result = false;
      scrollToEL = 'txtPermissionOfProduction_QTY_Max';
      this.app.setValidateControl(scrollToEL, false);
    }
    if (doc.CAPACITY_QUANTITY_MIN < 1) {
      result = false;
      scrollToEL = 'txtPermissionOfProduction_QTY_Min';
      this.app.setValidateControl(scrollToEL, false);
    }
    if (doc.CAPACITY_QUANTITY_AVG < 1) {
      result = false;
      scrollToEL = 'txtPermissionOfProduction_QTY_Avg';
      this.app.setValidateControl(scrollToEL, false);
    }
    if (doc.ACTUAL_QUANTITY < 1) {
      result = false;
      scrollToEL = 'txtPermissionOfProduction_QTY_Actual';
      this.app.setValidateControl(scrollToEL, false);
    }

    // -------------------------------
    if (isFocusToField && result) {
      scrollToEL = 'div-section-permission-production';
      this.app.scrollToElement(scrollToEL);
    }
    //console.log(this.DocRef);

    return true;
  }
  // ------------------------------------------------------
  //--------------------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  public get IsShowReferenceDoc_License(): boolean {
    return (
      (this.repo.currentRequestType > 10000) &&
      (this.DocRef.REF_LICENSE_NO != null && this.DocRef.REF_LICENSE_NO.trim().length > 0 )
    );
  }
  //--------------------------------------------------------
  public get IsShowReferenceDoc_OwnerLicense(): boolean {
    return (
      (this.repo.currentRequestType > 10000) &&
      (this.DocRef.REF_HAS_LICENSE_NO != null && this.DocRef.REF_HAS_LICENSE_NO.trim().length > 0)
    );
  }
}
