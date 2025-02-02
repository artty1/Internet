import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, ToCountry, Armament, UsageDetail, ReferenceDocument } from '../../shared/models/request-document';
import { CountryService } from '../../shared/services/lookup/country.service';
import { Country } from '../../shared/models/lookup';
import { RequestDocumentType } from '../../shared/enums/request-type.enum';

@Component({
  selector: 'cdss-section-source-of-enter',
  templateUrl: './section-source-of-enter.component.html',
  styleUrls: ['./section-source-of-enter.component.css']
})
export class SectionSourceOfEnterComponent extends BaseSection implements OnInit {

  @Input("IsImport") is_import: boolean = true;

  private isImport: boolean = true;
  public Country: Array<string>;
  public DocRef: ReferenceDocument;
  //--------------------------------------------------------
  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected repoCountry: CountryService) {
    super(app, repo);


    if (!repoCountry.hasData) repoCountry.refresh();

    this.Country = this.repo.currentDocument.Armament.ImportFromCounties;

    // if(this.Country.length>3){

    //   for(let i=this.Country.length;i<3; i++){
    //     this.Country.push('');
    //   }

    // }
    // console.log('this.Country : ', this.Country);

    this.DocRef = this.repo.currentDocument.ReferenceDocument;

    //this.DocRef.TRANSPORT_BY_PLANE

  }
  //-------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    let docRef = this.repo.currentDocument.ReferenceDocument;

    // ---------- set Default avoid null ---------
    if (docRef.ACTUAL_QUANTITY == null) this.DocRef.ACTUAL_QUANTITY = 0;
    if (docRef.GRADUAL_QUANTITY == null) this.DocRef.GRADUAL_QUANTITY= 0;
    if (docRef.ACTUAL_WEIGHT == null) this.DocRef.ACTUAL_WEIGHT = 0;
    if (docRef.REMAIN_QUANTITY== null) this.DocRef.REMAIN_QUANTITY= 0;
    if (docRef.REMAIN_WEIGHT == null) this.DocRef.REMAIN_WEIGHT = 0;

    if (docRef.REF_ADJUST_QTY == null) this.DocRef.REF_ADJUST_QTY = 0;
    if (docRef.INVOICE_UNIT_PRICE == null) this.DocRef.INVOICE_UNIT_PRICE = 0;
    // -------------------------------------------
    if (!forSubmit) return true;
    // -------------------------------------------
    let result: boolean = true;
    let scrollToEL: string = '';
    // ------------------------------------------------------
    if (docRef.GRADUAL_QUANTITY == null || docRef.GRADUAL_QUANTITY < 0) {
      result = false;
      scrollToEL = 'txtImport_PeriodQTY';
      this.app.setValidateControl(scrollToEL, false);
    }
    if (docRef.ACTUAL_QUANTITY == null || docRef.ACTUAL_QUANTITY < 0) {
      result = false;
      scrollToEL = 'txtImport_Done';
      this.app.setValidateControl(scrollToEL, false);
    }
    if (docRef.REMAIN_QUANTITY == null || docRef.REMAIN_QUANTITY < 0) {
      result = false;
      scrollToEL = 'txtImport_Rest';
      this.app.setValidateControl(scrollToEL, false);
    }
    if (docRef.INVOICE_UNIT_PRICE == null || docRef.INVOICE_UNIT_PRICE < 0) {
      result = false;
      scrollToEL = 'txtImport_UnitPrice';
      this.app.setValidateControl(scrollToEL, false);
    }
    // ------------------------------------------------------
    scrollToEL = 'div-section-source-of-enter';
    if (!result && isFocusToField) this.app.scrollToElement(scrollToEL);
    // ------------------------------------------------------
    return result;
  }
  // ------------------------------------------------------
  // ----------------------------------------
  //public clearValidate(elID) {
  //  this.app.setValidateControl(elID, true);
  //}
  // ----------------------------------------
  ngOnInit() {
  }
  //--------------------------------------------------------
  public get SectionHeader(): string {

    let result = "";

    switch(this.repo.currentDocument.LogicOfDocument.requestType){
      case RequestDocumentType.EnterWithOwner:
      case RequestDocumentType.Renewal_Enter:
        result = "ข้อมูลการสั่งเข้ามา";
        this.isImport = true;
        break;
      case RequestDocumentType.ImportWithOwner:
        case RequestDocumentType.Renewal_Import:
        result = "ข้อมูลการนำเข้า";
        this.isImport = false;
        break;
    }

    // if (this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.EnterWithOwner) {

    //   result = "ข้อมูลการสั่งเข้ามา";
    //   this.isImport = true;
    // } else if (this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.ImportWithOwner) {

    //   result = "ข้อมูลการนำเข้า";
    //   this.isImport = false;
    // } else {

    // }

    return result

  }
  //--------------------------------------------------------
  public get CountryList(): Array<Country> {
    return this.repoCountry.Datasource;
  }
  //--------------------------------------------------------
  public get IsShowReferenceDoc_License(): boolean {
    return (
      //(this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.Renewal) &&
      (this.repo.currentDocument.LogicOfDocument.requestType > 10000) &&
      (this.DocRef.REF_LICENSE_NO != null && this.DocRef.REF_LICENSE_NO.trim().length > 0)
    );
  }
  //--------------------------------------------------------
  public get IsShowReferenceDoc_OwnerLicense(): boolean {
    return (
      //(this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.Renewal) &&
      (this.repo.currentDocument.LogicOfDocument.requestType > 10000) &&
      (this.DocRef.REF_HAS_LICENSE_NO != null && this.DocRef.REF_HAS_LICENSE_NO.trim().length > 0)
    );
  }
  //--------------------------------------------------------
  //public get Country_01(): string {
  //    return this.repo.currentDocument.Armament.ImportFromCounties[0];
  //}
  ////--------------------------------------------------------
  //public get Country_02(): string {
  //    return this.repo.currentDocument.Armament.ImportFromCounties[1];
  //}
  ////--------------------------------------------------------
  //public get Country_03(): string {
  //    return this.repo.currentDocument.Armament.ImportFromCounties[2];
  //}
  //--------------------------------------------------------
  public displayCountry(e: any, indexOfCountry: number) {

    console.log('displayCountry : ', e.target, indexOfCountry);

    const countryCode = e.target.value;
    this.repo.currentDocument.Armament.ImportFromCounties[indexOfCountry] = countryCode;
    // console.log(this.repo.currentDocument);
  }
  //--------------------------------------------------------
  public setCheckbox(checkID, TransName) {
    let check: any = document.getElementById(checkID);
    let value:number = 0;
    if (check.checked) {
      value = 1;
    } else {
      value = 0;
    }

    switch (TransName) {
      case 'BOAT':
        this.repo.currentDocument.ReferenceDocument.TRANSPORT_BY_BOAT = value;
        break;
      case 'PLANE':
        this.repo.currentDocument.ReferenceDocument.TRANSPORT_BY_PLANE = value;
        break;
      case 'TRUCK':
        this.repo.currentDocument.ReferenceDocument.TRANSPORT_BY_TRUCK = value;
        break;
    }

    //console.log('setCheckBox(data) : ', data);
    //console.log("TRANSPORT_BY_BOAT : ", this.repo.currentDocument.ReferenceDocument.TRANSPORT_BY_BOAT);
    //console.log("TRANSPORT_BY_TRUCK : ", this.repo.currentDocument.ReferenceDocument.TRANSPORT_BY_TRUCK);
    //console.log("TRANSPORT_BY_PLANE : ", this.repo.currentDocument.ReferenceDocument.TRANSPORT_BY_PLANE);

  }
}
