import { Component, OnInit, Input, Output } from '@angular/core';
//import { CorporationModel } from '../../shared/models/corporation';
import { ApplicationContext } from '../../application-context';

//import { baseSectionComponent } from './../request-document/base-section-component/base-section-component.component';
import { LookupService } from '../../shared/services/lookup.service';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { Trader } from '../../shared/models/common';
import { BaseSection } from './../../shared/base/base-section';

declare var $: any;

@Component({
  selector: 'cdss-section-trader-profile',
  templateUrl: './section-trader-profile.component.html',
  styleUrls: ['./section-trader-profile.component.css']
})
//export class SectionTraderProfileComponent extends baseSectionComponent implements OnInit  {
export class SectionTraderProfileComponent extends BaseSection implements OnInit {
  //-------------------------------------------
  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService) {
    //super(app, repo, lookup);
    super(app, repo);

    //this.is_hidden = false;
  }
  //-------------------------------------------
  ngOnInit() {
  }
  //-------------------------------------------
  ngAfterViewInit(): void {
    //this.swapMode(this._isEditMode);
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ------------------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  public datasource(): Trader {
    return this.app.traderInformation;
  }

  public get NameOfTraderType(): string {
    return this.IsPerson ? "บุคคลธรรมดา" : "นิติบุคคล"; 
  }
  //-------------------------------------------
  public get IsPerson(): boolean {
    return (this.app.traderInformation.TRADER_TYPE == 1);
  }
  //-------------------------------------------
  public get registerPlace(): string {
    return this.app.traderInformation.REGISTER_SUB_PROVINCE_NAME + " " + this.app.traderInformation.REGISTER_PROVINCE_NAME;
  }
  //-------------------------------------------
  //@Input()
  //public get isEditMode(): boolean {
  //  return this._isEditMode;
  //}
  //public set isEditMode(value: boolean) {

  //  if (this._isEditMode != value) {
  //    this._isEditMode = value;
  //    this.swapMode(this._isEditMode);

  //  }
  //}
 
  ////-------------------------------------------
  //@Input()
  //public get datasource(): CorporationModel {
  //  return this._datasource;
  //}
  //public set datasource(value: CorporationModel) {
  //  this._datasource = value;
  //}
  //-------------------------------------------
  //-------------------------------------------
  private swapMode(value) {
    //if (value) {
    //  $('#txtRegisterDate').datepicker({
    //    language: this.app.getCurrentLanguage
    //  });
    //} else {
    //  $('#txtRegisterDate').datepicker('destroy');
    //}
  }
  //-------------------------------------------

  //-------------------------------------------
  //-------------------------------------------
  //private mockupData() {
  //  this._datasource = new CorporationModel();
  //  this._datasource.taxID = "3101400336736";
  //  this._datasource.addressBuilding = "พรีม่าศรีนครินทร์";
  //  this._datasource.addressDistrict = "สวนหลวง";
  //  this._datasource.addressSubDistrict = "อ่อนนุช";
  //  this._datasource.addressMoo = "";
  //  this._datasource.addressNo = "1134/223";
  //  this._datasource.addressProvince = "กทม.";
  //  this._datasource.addressSoi = "";
  //  this._datasource.addressStreet = "ศรีนครินทร์";
  //  this._datasource.addressVillage = "";
  //  this._datasource.addressZipcode = "10250";
  //  this._datasource.email = "monchai@outlook.com";
  //  this._datasource.fax = "";

  //  this._datasource.phone = "0824526688";

  //}
}
