import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, ReferenceDocument, Armament } from '../../shared/models/request-document';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';

import { jQueryHelper } from './../../shared/helpers/jquery-helper';
import { PopupSearchRefLicense } from '../popup-search-ref-license/popup-search-ref-license.component';

import { DialogResult } from '../../shared/base/base-modal-dialog';
import { ProvinceService } from '../../shared/services/lookup/province.service';
import { Province, Country } from '../../shared/models/lookup';
import { CountryService } from '../../shared/services/lookup/country.service';
import { LicenseDocumentForUIList } from '../../shared/models/documentForUIList';
import { RequestDocumentType } from 'src/app/shared/enums/request-type.enum';
import { UnitService } from 'src/app/shared/services/lookup/unit.service';


@Component({
  selector: 'cdss-section-detail-of-export',
  templateUrl: './section-detail-of-export.component.html',
  styleUrls: ['./section-detail-of-export.component.css']
})
export class SectionDetailOfExportComponent extends BaseSection implements OnInit, OnDestroy, AfterViewInit {

  private jh = new jQueryHelper();
  public RefDoc: ReferenceDocument;
  public Arm: Armament;


  public countryOfExport: string;
  public countryOfImport: string;

  private popupOfLicense: PopupSearchRefLicense;
  //private popupOfOwnerLicense: PopupSearchRefLicenseOwner;
  private isExportYearly: boolean = false;

  public SelectLicenseType = ExportReference;

  constructor(
    public app: ApplicationContext,
    public repo: RequestDocumentService,
    protected repoPorvince: ProvinceService,
    protected repoCountry: CountryService,
    protected repoUnit: UnitService
  ) {
    super(app, repo);

    this.title = 'การส่งออก';

    this.RefDoc = repo.currentDocument.ReferenceDocument;
    this.Arm = repo.currentDocument.Armament;

    console.log('ref doc: ', this.RefDoc);

    // if (this.repo.currentDocument.Armament.ExportToCounties.length > 0) {
    //   this.countryOfExport = this.repo.currentDocument.Armament.ExportToCounties[0];
    // }else{
    //   this.countryOfExport = "";
    // }

    // if(    this.requestDocumentType == RequestDocumentType.CrossBorder ||
    //   this.requestDocumentType == RequestDocumentType.Renewal_CrossBorder)

    if(this.IsRequest_Export){
      // if(this.IsRequest_ExportCrossBorder){
      //   this.countryOfExport = (this.repo.currentDocument.Armament.CONSIGNOR_COUNTRY_CODE) ? this.repo.currentDocument.Armament.CONSIGNOR_COUNTRY_CODE : '';
      // }else{
        this.countryOfExport = (this.repo.currentDocument.Armament.CONSIGNEE_COUNTRY_CODE) ? this.repo.currentDocument.Armament.CONSIGNEE_COUNTRY_CODE : '';
      // }
    }

    if (this.repo.currentDocument.Armament.ImportFromCounties.length > 0) {
      this.countryOfImport = this.repo.currentDocument.Armament.ImportFromCounties[0];
    }else{
      this.countryOfImport = "";
    }

    this.isExportYearly = (this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.Export);
    this.refreshUnitName();
    // console.log('constructor detail of export');
    this.registerOnAfterViewInit(this.initDatePicker);

  }
  //--------------------------------------------------------
  ngOnInit() {

  }
  //--------------------------------------------------------
  // ngAfterViewInit() {
  //   // console.log('ngAfterViewInit');
  //   this.initDatePicker();
  // }
  //--------------------------------------------------------
  ngOnDestroy() {
    this.jh.toDestroy_DatePicker("cmdExportPODate");
    this.jh.toDestroy_DatePicker("cmdExportPODocDate");
    this.jh.toDestroy_DatePicker("cmdExportPeriodFrom");
    this.jh.toDestroy_DatePicker("cmdExportPeriodTo");
  }
  //--------------------------------------------------------
  public get IsRequest_Export(): boolean{
    let result = (
      (this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.SendSample || this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.SendSampleWithOwner) ||
      (this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.Export || this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.ExportWithOwner) ||
      (this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.ExportSpecial || this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.ExportSpecialWithOwner) ||
      (this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.CrossBorder || this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.CrossBorderWithOwner)
    );

   return result;
  }
  //--------------------------------------------------------
  public get IsRequest_ExportCrossBorder(): boolean{
    let result = (
      this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.CrossBorder ||
      this.repo.currentDocument.LogicOfDocument.requestType == RequestDocumentType.Renewal_CrossBorder
    );

   return result;
  }
  //--------------------------------------------------------
  private initDatePicker() {

    // console.log('initDatePicker');

    this.jh.toDatePicker("cmdExportPODate", 'export-po-date', this.repo.currentDocument.ReferenceDocument.PO_DATE, (tag, data) => { this.changeDate(tag, data) });
    this.jh.toDatePicker("cmdExportPODocDate", 'export-po-doc-date', this.repo.currentDocument.ReferenceDocument.DOC_END_USER_DATE, (tag, data) => { this.changeDate(tag, data) });
    this.jh.toMonthPicker("cmdExportPeriodFrom", 'export-period-form', this.repo.currentDocument.ReferenceDocument.EXPORT_START_TIME, (tag, data) => { this.changeDate(tag, data) });
    this.jh.toMonthPicker("cmdExportPeriodTo", 'export-period-to', this.repo.currentDocument.ReferenceDocument.EXPORT_END_TIME, (tag, data) => { this.changeDate(tag, data) });
  }
  //--------------------------------------------------------
  public get ProvinceList(): Array<Province> {
    return this.repoPorvince.Datasource;
  }
  //--------------------------------------------------------
  public get CountryList(): Array<Country> {
    return this.repoCountry.Datasource;
  }
  //--------------------------------------------------------
  private changeDate(tag, data) {
    //console.log('tag : ', tag, ' : data : ', data);

    switch (tag) {
      case 'export-po-date':
        this.RefDoc.PO_DATE = data;
        break;
      case 'export-po-doc-date':
        this.RefDoc.DOC_END_USER_DATE = data;
        break;
      case 'export-period-form':
        this.RefDoc.EXPORT_START_TIME = data;
        break;
      case 'export-period-to':
        this.RefDoc.EXPORT_END_TIME = data;
        break;

    }

  }
  //--------------------------------------------------------
  public initialPopup(arg: DialogResult) {

    this.popupOfLicense = arg.sender;
  }
  // ------------------------------------------------------
  public setTransformBy(byType, elID) {
    let isCheck:any = document.getElementById(elID);
    let value = isCheck.checked ? 1 : 0;


    switch (byType) {
      case 'B':
        this.RefDoc.TRANSPORT_BY_BOAT = value;
        break;
      case 'P':
        this.RefDoc.TRANSPORT_BY_PLANE = value;
        break;
      case 'T':
        this.RefDoc.TRANSPORT_BY_TRUCK = value;
        break;

    }
    // console.clear();
    // console.log(this.repo.currentDocument);
  }

  public get IsCheck_ByPlane(): boolean {
    return this.RefDoc.TRANSPORT_BY_PLANE==1;
  }
  // ------------------------------------------------------
  public get IsCheck_ByTruck(): boolean {
    return this.RefDoc.TRANSPORT_BY_TRUCK==1;
  }
  // ------------------------------------------------------
  public get IsCheck_ByBoat(): boolean {
    return this.RefDoc.TRANSPORT_BY_BOAT==1;
  }
  // ------------------------------------------------------
  public changeExportStartTime(elID) {
    let source:any = document.getElementById(elID);

    // console.log('changeExportStartTime : ', source.value);

  }
  // ------------------------------------------------------
  public changeExportEndTime(elID) {
    let source: any = document.getElementById(elID);

    // console.log('changeExportStartTime : ', source.value);
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    // console.log('Validate');
    // ......................................
    // this.repo.currentDocument.Armament.CONSIGNOR_COUNTRY_CODE = this.countryOfExport;
    // if (this.countryOfExport.trim().length > 0) {
    //   if (this.repo.currentDocument.Armament.ExportToCounties.length > 0) {
    //     this.repo.currentDocument.Armament.ExportToCounties[0] = this.countryOfExport;
    //   } else {
    //     this.repo.currentDocument.Armament.ExportToCounties.push(this.countryOfExport);
    //   }
    // }
    if(this.IsRequest_Export){
      // if(this.IsRequest_ExportCrossBorder){
      //   this.repo.currentDocument.Armament.CONSIGNOR_COUNTRY_CODE = this.countryOfExport;
      // }else{
        this.repo.currentDocument.Armament.CONSIGNEE_COUNTRY_CODE = this.countryOfExport;
      // }
    }

    if (this.countryOfImport.trim().length > 0) {
      if (this.repo.currentDocument.Armament.ImportFromCounties.length > 0) {
        this.repo.currentDocument.Armament.ImportFromCounties[0] = this.countryOfImport;
      } else {
        this.repo.currentDocument.Armament.ImportFromCounties.push(this.countryOfImport);
      }
    }

    // ......................................
    if (!forSubmit) {
      return true;
    }
    // ......................................
    let result: boolean = true;
    let scrollToEL: string = '';
    let refDoc = this.repo.currentDocument.ReferenceDocument;


    // ---------------------  change on https://app.clickup.com/t/860pbqh32 ---------------------
    // if (refDoc.GRADUAL_QUANTITY == null || refDoc.GRADUAL_QUANTITY < 1) {
    //   result = false;
    //   scrollToEL = "txtImport_PeriodQTY";
    //   this.app.setValidateControl(scrollToEL, false);
    // }
    // if (refDoc.REMAIN_QUANTITY == null || refDoc.REMAIN_QUANTITY < 1) {
    //   result = false;
    //   scrollToEL = "txtImport_Done";
    //   this.app.setValidateControl(scrollToEL, false);
    // }
    // ----------------------- change ---------------------


    // ......................................
    if (isFocusToField && !result) {
      scrollToEL = 'div-section-detail-of-export';
      this.app.scrollToElement(scrollToEL);
    }
    // ......................................



    // if(this.countryOfExport.length>0){

    // }

    return result;
  }
  // ------------------------------------------------------
  // ----------------------------------------
  public unitNameOfReferenceLicense:string = '';
  public unitNameOfReferenceHasLicense:string = '';
  public unitNameOfReferenceExportLicense:string = '';

  private refreshUnitName(){

    if(this.RefDoc.REF_LICENSE_QTY_UNIT_ID && this.RefDoc.REF_LICENSE_QTY_UNIT_ID>0){
      this.unitNameOfReferenceLicense = this.repoUnit.getUnitNameFromUnitID(this.RefDoc.REF_LICENSE_QTY_UNIT_ID);
    }

    if(this.RefDoc.REF_HAS_LICENSE_QTY_UNIT_ID && this.RefDoc.REF_HAS_LICENSE_QTY_UNIT_ID>0){
      this.unitNameOfReferenceHasLicense = this.repoUnit.getUnitNameFromUnitID(this.RefDoc.REF_HAS_LICENSE_QTY_UNIT_ID);
    }

    if(this.RefDoc.REF_EXPORT_LICENSE_QTY_UNIT_ID && this.RefDoc.REF_EXPORT_LICENSE_QTY_UNIT_ID>0){
      this.unitNameOfReferenceExportLicense = this.repoUnit.getUnitNameFromUnitID(this.RefDoc.REF_EXPORT_LICENSE_QTY_UNIT_ID);
    }
  }

  public searchReferenceLicense(forLicense:ExportReference) {

    if (forLicense==ExportReference.forLicense) {
      //this.popupOfLicense.openForSearchLicense((result:DialogResult) => {
      this.popupOfLicense.openForSearchLicenseExceptExport((result:DialogResult) => {
        if (result.data != null) {
          // console.log('search license : OK', result.data);
          let license: LicenseDocumentForUIList = result.data;

          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_NO = license.license_no;

          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_ISSUE_DATE = license.license_issue_date;
          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_EXPIRY_DATE = license.license_expire_date;

          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_QTY = license.qty;
          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_QTY_UNIT_ID = license.qty_unit_id;

          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_WT = license.weight;
          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_WT_UNIT_ID = license.weight_unit_id;

          this.repo.currentDocument.ReferenceDocument.REF_LICENSE_FORM_ID = license.form_id;
          this.unitNameOfReferenceLicense = license.qty_unit_name;
        }
      });

    } else if(forLicense==ExportReference.forHasLicense) {
      //this.popupOfLicense.openForSearchOwnerLicense((result: DialogResult) => {
      this.popupOfLicense.openForSearchOwnerLicenseExceptExport((result: DialogResult) => {
        if (result.data != null) {
          // console.log('search owner license : OK', result.data);
          let license: LicenseDocumentForUIList = result.data;

          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO = license.license_no;

          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_ISSUE_DATE = license.license_issue_date;
          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_EXPIRY_DATE = license.license_expire_date;

          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY = license.qty;
          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY_UNIT_ID = license.qty_unit_id;

          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT = license.weight;
          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT_UNIT_ID = license.weight_unit_id;

          this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_FORM_ID = license.form_id;
          this.unitNameOfReferenceHasLicense = license.qty_unit_name;
        }
      });
    }else if(forLicense==ExportReference.forExportLicense){
        // alert('show dialog select license');
        this.popupOfLicense.openForSearchExportLicense((result: DialogResult)=>{
          if(result.data != null){

            let license: LicenseDocumentForUIList = result.data;

          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_NO = license.license_no;

          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_ISSUE_DATE = license.license_issue_date;
          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_EXPIRY_DATE = license.license_expire_date;

          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_QTY = license.qty;
          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_QTY_UNIT_ID = license.qty_unit_id;

          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_WT = license.weight;
          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_WT_UNIT_ID = license.weight_unit_id;

          this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_FORM_ID = license.form_id;
          this.unitNameOfReferenceExportLicense = license.qty_unit_name;
          }
        });
    }

  }

  //public clearReferenceLicense(forLicense:boolean){
  public clearReferenceLicense(forLicense:ExportReference){
    if (forLicense==ExportReference.forLicense) {
      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_NO = "";

      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_ISSUE_DATE = null;
      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_EXPIRY_DATE = null;

      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_QTY = 0;
      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_QTY_UNIT_ID = 0;

      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_WT = 0;
      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_WT_UNIT_ID = 0;

      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_FORM_ID = 0;
      this.unitNameOfReferenceLicense = "";
    }else if(forLicense==ExportReference.forHasLicense){
      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO = "";

      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_ISSUE_DATE = null;
      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_EXPIRY_DATE = null;

      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY = 0;
      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY_UNIT_ID = 0;

      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT = 0;
      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT_UNIT_ID = 0;

      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_FORM_ID = 0;
      this.unitNameOfReferenceHasLicense = "";
    }else if(forLicense==ExportReference.forExportLicense){
      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_NO = "";

      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_ISSUE_DATE = null;
      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_EXPIRY_DATE = null;

      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_QTY = 0;
      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_QTY_UNIT_ID = 0;

      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_WT = 0;
      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_WT_UNIT_ID = 0;

      this.repo.currentDocument.ReferenceDocument.REF_EXPORT_LICENSE_FORM_ID = 0;
      this.unitNameOfReferenceExportLicense = "";
    }
  }
  // ----------------------------------------
  public get hideForChange_20221221(): boolean{
    //https://app.clickup.com/t/860pbe5uj
    // hide only export yearly, not include export special
    return this.isExportYearly;
  }
  public get AmamentQTY(): number{
    return this.repo.currentDocument.Armament.QUANTITY;
  }
  public set AmamentQTY(value: number){
    this.repo.currentDocument.Armament.QUANTITY = value;
  }

  public calRemain(){

    if(this.RefDoc!.REF_EXPORT_LICENSE_QTY>0){
      this.RefDoc.REMAIN_QUANTITY = (this.RefDoc!.REF_EXPORT_LICENSE_QTY - this.RefDoc.GRADUAL_QUANTITY);

      if(this.RefDoc.REMAIN_QUANTITY<0) this.RefDoc.REMAIN_QUANTITY = 0;
    }


  }
}


enum ExportReference{
  forLicense, forHasLicense, forExportLicense
}
