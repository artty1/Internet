import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseSection } from './../../shared/base/base-section';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { RequestDocument, ReferenceDocument, Armament, ToCountry } from '../../shared/models/request-document';
import { CountryService } from '../../shared/services/lookup/country.service';
import { ProvinceService } from '../../shared/services/lookup/province.service';

import { jQueryHelper } from './../../shared/helpers/jquery-helper';
import { Country, Customs, Province } from '../../shared/models/lookup';
import { CustomsService } from 'src/app/shared/services/lookup/customs.service';

@Component({
  selector: 'cdss-section-cross-border',
  templateUrl: './section-cross-border.component.html',
  styleUrls: ['./section-cross-border.component.css']
})
export class SectionCrossBorderComponent extends BaseSection implements OnInit, OnDestroy {

  private jh = new jQueryHelper();

  public ID_OF_CALENDAR_EXPORT_FROM_TEXT = 'txtExportFrom';
  public ID_OF_CALENDAR_EXPORT_TO_TEXT = 'txtExportTO';

  public ID_OF_CALENDAR_EXPORT_FROM_BUTTON = 'cmdExportFrom';
  public ID_OF_CALENDAR_EXPORT_TO_BUTTON = 'cmdExportTO';

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, public repoCountry:CountryService, public repoProvince: ProvinceService, public repoCustoms: CustomsService) {
    super(app, repo);
    this.title = 'ส่งผ่านแดน';
    //this.checkRequestType(this.repo.currentDocument)
    this.registerOnAfterViewInit(this.initCalendar);

    if (!this.repoProvince.hasData) {
      this.repoProvince.refresh();
    }
    if(!this.repoCustoms.hasData){
      this.repoCustoms.refresh();
    }

    // console.log(this.repo.currentDocument);
  }
  // ------------------------------------------------------
  ngOnInit() {
  }
  // ------------------------------------------------------
  // ------------------------------------------------------
  public get RefDoc(): ReferenceDocument {
    return this.repo.currentDocument.ReferenceDocument;
  }
  // ------------------------------------------------------
  public get DocDetail(): Armament  {
    return this.repo.currentDocument.Armament;
  }
  // ------------------------------------------------------
  public get ProvinceList(): Array<Province> {
    return this.repoProvince.Datasource;
  }
  // ------------------------------------------------------
  public get CountryList(): Array<Country> {
    return this.repoCountry.Datasource;
  }
  // ------------------------------------------------------
  public get CustomsList(): Array<Customs>{
    return this.repoCustoms.Datasource;
  }
  // ------------------------------------------------------
  // ------------------------------------------------------
  public get PODocEndUserName(): string {
    return this.repo.currentDocument.ReferenceDocument.DOC_END_USER_NAME;
  }
  public set PODocEndUserName(value: string) {
    this.repo.currentDocument.ReferenceDocument.DOC_END_USER_NAME = value;
  }
  // ------------------------------------------------------
  // ------------------------------------------------------
  public get PODocEndUserDate(): Date {
    return this.repo.currentDocument.ReferenceDocument.DOC_END_USER_DATE;
  }
  // ------------------------------------------------------
  public set PODocEndUserDate(value: Date) {
    this.repo.currentDocument.ReferenceDocument.DOC_END_USER_DATE = value;
  }
  // ------------------------------------------------------
  // ------------------------------------------------------
  public get Objective(): string {
    return this.repo.currentDocument.ReferenceDocument.NOTE2;
  }
  // ------------------------------------------------------
  public set Objective(value: string) {
    this.repo.currentDocument.ReferenceDocument.NOTE2 = value;
  }
  // ------------------------------------------------------
  // ------------------------------------------------------
  public get CountryEXCT(): string {
    return this.repo.currentDocument.Armament.CONSIGNEE_COUNTRY_CODE
  }
  // ------------------------------------------------------
  public set CountryEXCT(value: string) {
    this.repo.currentDocument.Armament.CONSIGNEE_COUNTRY_CODE = value;

  }
  // ------------------------------------------------------
  // ------------------------------------------------------
  public get CountryIMCT(): string {
    return this.repo.currentDocument.Armament.CONSIGNOR_COUNTRY_CODE
  }
  // ------------------------------------------------------
  public set CountryIMCT(value:string) {
    this.repo.currentDocument.Armament.CONSIGNOR_COUNTRY_CODE = value;
  }
  // ------------------------------------------------------
  // ------------------------------------------------------
  ngOnDestroy() {
    this.jh.toDestroy_DatePicker(this.ID_OF_CALENDAR_EXPORT_FROM_BUTTON);
    this.jh.toDestroy_DatePicker(this.ID_OF_CALENDAR_EXPORT_TO_BUTTON);
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

      // if(this.repo.currentDocument.Armament.CONSIGNEE_COUNTRY_CODE && this.repo.currentDocument.Armament.CONSIGNEE_COUNTRY_CODE.length > 0){

      // }else{

      // }

    return true;
  }
  // ------------------------------------------------------
  public initCalendar() {

    this.jh.toMonthPicker('cmdExportPeriodFrom', 'export-from', null, (tag, data) => { this.setData(tag, data); });
    this.jh.toMonthPicker('cmdExportPeriodTo', 'export-to', null, (tag, data) => { this.setData(tag, data); });
    this.jh.toDatePicker('cmdExportPODate', 'po-date', null, (tag, data) => { this.setData(tag, data); });
    this.jh.toDatePicker('cmdCrossBorderPODocEndUserDate', 'po-date-enduser', null, (tag, data) => { this.setData(tag, data); });

  }
  // ----------------------------------------
  // ------------------------------------------------------
  public get Note1(): string {
    return this.repo.currentDocument.Armament.NOTE1;
  }
  public set Note1(value: string) {
    this.repo.currentDocument.Armament.NOTE1 = value;
  }
  // ------------------------------------------------------

  //public setTransformBy(byType, elID) {
  //  let isCheck: any = document.getElementById(elID);
  //  let value = isCheck.checked ? 1 : 0;


  //  switch (byType) {
  //    case 'B':
  //      this.RefDoc.TRANSPORT_BY_BOAT = value;
  //      break;
  //    case 'P':
  //      this.RefDoc.TRANSPORT_BY_BOAT = value;
  //      break;
  //    case 'T':
  //      this.RefDoc.TRANSPORT_BY_BOAT = value;
  //      break;

  //  }
  //}

  //public get IsCheck_ByPlane(): boolean {
  //  return this.RefDoc.TRANSPORT_BY_PLANE == 1;
  //}
  //// ------------------------------------------------------
  //public get IsCheck_ByTruck(): boolean {
  //  return this.RefDoc.TRANSPORT_BY_TRUCK == 1;
  //}
  //// ------------------------------------------------------
  //public get IsCheck_ByBoat(): boolean {
  //  return this.RefDoc.TRANSPORT_BY_BOAT == 1;
  //}
  //-------------------------------------------------------
  private setData(tag, data) {
    console.log(tag, data);
    switch (tag) {
      case 'po-date':
        this.repo.currentDocument.ReferenceDocument.PO_DATE = data;
        break;
      case 'export-from':
        this.repo.currentDocument.ReferenceDocument.EXPORT_START_TIME = data;
        break;
      case 'export-to':
        this.repo.currentDocument.ReferenceDocument.EXPORT_END_TIME = data;
        break;
      case 'po-date-enduser':
        //console.log('po-date-enduser : ', data);
        this.PODocEndUserDate = data;
        break;
    }

  }
  //-------------------------------------------------------
  public changeCrossPort(isPortIn:boolean){
    if(isPortIn){
      const cust = this.repoCustoms.Datasource.find((cust: Customs)=>{
        return (cust.AreaCode == this.repo.currentDocument.Armament.CROSS_IN_PORT);
      });
      if(cust && cust.Province && cust.Province.length>0){
        this.repo.currentDocument.Armament.CROSS_IN_PROVINCE_NM = cust.Province;
      }
    }else{
      const cust = this.repoCustoms.Datasource.find((cust: Customs)=>{
        return (cust.AreaCode == this.repo.currentDocument.Armament.CROSS_OUT_PORT);
      });
      if(cust && cust.Province && cust.Province.length>0){
        this.repo.currentDocument.Armament.CROSS_OUT_PROVINCE_NM = cust.Province;
      }
    }
  }
  //-------------------------------------------------------
}
