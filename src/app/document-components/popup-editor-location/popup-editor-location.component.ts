import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { BaseDialog } from '../../components/dialog/dialog.component';
import { ApplicationContext } from '../../application-context';
import { Address } from '../../shared/models/common';
//import { EventResult } from '../../shared/models/result';
import { PopupListLocation } from '../popup-list-location/popup-list-location.component';
import { Location } from '../../shared/models/request-document';
import { baseModalDialog, DialogResult } from '../../shared/base/base-modal-dialog';
import { ProvinceService } from '../../shared/services/lookup/province.service';
import { DistrictService } from '../../shared/services/lookup/district.service';
import { SubdistrictService } from '../../shared/services/lookup/subdistrict.service';
import { Province, District, SubDistrict } from '../../shared/models/lookup';

@Component({
  selector: 'cdss-popup-editor-location',
  templateUrl: './popup-editor-location.component.html',
  styleUrls: ['./popup-editor-location.component.css']
})
//export class PopupEditorLocationComponent extends BaseDialog implements OnInit {
export class PopupEditorLocation extends baseModalDialog implements OnInit {

  private currentAddress: Address;
  private is_lock: boolean;
  private has_reference_to_address: boolean;  
  private for_production: boolean = true;

  private popup_list: PopupListLocation;
  //---------------------------------------------------
  constructor(protected app: ApplicationContext, protected repoProvince: ProvinceService, protected repoDistrict:DistrictService, protected repoSubDistrict: SubdistrictService) {
    super();
    this.allowEscape = true;
    this.init();
  }
  //---------------------------------------------------
  ngOnInit() {

  }
  //---------------------------------------------------
  @Input("ForProduction")
  public get ForProduction(): boolean {
    return this.for_production;
  }
  public set ForProduction(value: boolean) {
    this.for_production = value;
  }

  //---------------------------------------------------
  public init() {
    this.currentAddress = new Address();
    this.has_reference_to_address = false;
    this.is_lock = false;

    //this.addButton("OK", true, true, false, '', () => this.validateData());
    //this.addButton("Cancel", false, true, true, '', () => this.close(false));

    if (!this.repoProvince.hasData) this.repoProvince.refresh();
    //if (!this.repoSubDistrict.hasData) this.repoSubDistrict.refresh();
    //if (!this.repoDistrict.hasData) this.repoDistrict.refresh();



  }
  //---------------------------------------------------
  public clearValidate(eleID:string){
    this.app.setValidateControl(eleID, true);
  }
  //---------------------------------------------------
  public validateData() {
    // console.log('validateData : ', this.currentAddress);

    if(this.currentAddress.LOCATION_NAME.trim().length==0){
      this.app.setValidateControl("txtAddressName", false);
      return;
    }


    this.currentAddress.ID = 0;
    //this.close(true);
    this.innerClose(true);
  }
  //---------------------------------------------------
  public initLocationList(arg:DialogResult) {
    this.popup_list = arg.sender;
  }
  //---------------------------------------------------
  public showAddressList() {
    this.popup_list.refreshData();
    this.popup_list.openDialog();
  }
  //---------------------------------------------------
  public getAddressFromTraderProfile() {

    this.currentAddress.ID = -1;
    this.currentAddress.LOCATION_NAME = this.app.traderInformation.TRADER_NAME;
    this.currentAddress.ADDRESS_NO = this.app.traderInformation.ADDRESS_NO;
    this.currentAddress.BUILDING_NAME = this.app.traderInformation.BUILDING_NAME;
    this.currentAddress.VILLAGE = this.app.traderInformation.VILLAGE;
    this.currentAddress.MOO = this.app.traderInformation.MOO;
    this.currentAddress.SOI = this.app.traderInformation.SOI;
    this.currentAddress.STREET = this.app.traderInformation.STREET;
    this.currentAddress.DISTRICT_NAME = this.app.traderInformation.DISTRICT_NAME;
    this.currentAddress.SUB_PROVINCE_NAME = this.app.traderInformation.SUB_PROVINCE_NAME;
    this.currentAddress.PROVINCE_NAME = this.app.traderInformation.PROVINCE_NAME;
    this.currentAddress.POSTCODE = this.app.traderInformation.POSTCODE;
    this.currentAddress.PHONE_NO = this.app.traderInformation.PHONE_NO;
    this.currentAddress.FAX_NO = this.app.traderInformation.FAX_NO;
    this.currentAddress.E_MAIL_ADDRESS = this.app.traderInformation.E_MAIL_ADDRESS;

    this.has_reference_to_address = true;
    this.is_lock = true;

  }
  //--------------------------------------
  public get address(): Address {
    //console.log('get address : ', this.currentAddress);
    return this.currentAddress;
  }
  //-----------------------------------------------
  public get isLock() {
    return this.is_lock;
  }
  //-----------------------------------------------
  public get isShowLockCheckbox() {
    return this.has_reference_to_address;
  }
  //-----------------------------------------------
  //public selectAddress(arg: EventResult) {
  public selectAddress(arg: DialogResult) {

    let address: Address = arg.data;
    this.setData(address);
    this.is_lock = true;
    //this.popup_list.CloseDialog();
    this.popup_list.closeDialog();
  }
  //-----------------------------------------------
  public setData(data:Address) {
    this.app.setValidateControl("txtAddressName", true);
    this.currentAddress = data;
    this.is_lock = false;
  }
  //-----------------------------------------------
  public locationToAddress(data: Location): Address {
    let result = new Address;

    result.ID = data.ID;
    //result. = data.LICENSE_REQ_ID;
    result.TRADER_ID = data.TRADER_ID;
    result.LOCATION_NO = 0;
    result.LOCATION_NAME = data.LOCATION_NAME;
    result.ADDRESS_NO = data.ADDRESS_NO;
    result.BUILDING_NAME = data.BUILDING_NAME;
    result.VILLAGE = data.VILLAGE;
    result.MOO = data.MOO;
    result.SOI = data.SOI;
    result.STREET = data.STREET;
    result.DISTRICT_NAME = data.DISTRICT_NAME;
    result.SUB_PROVINCE_NAME = data.SUB_PROVINCE_NAME;
    result.PROVINCE_NAME = data.PROVINCE_NAME;
    result.POSTCODE = data.POSTCODE;
    result.PHONE_NO = data.PHONE_NO;
    result.FAX_NO = data.FAX_NO;
    result.E_MAIL_ADDRESS = data.E_MAIL_ADDRESS;
    result.FOR_PRODUCTION = data.FOR_PRODUCTION;
    result.FOR_KEEPING = data.FOR_KEEPING;
    result.NOTE1 = data.NOTE1;
    result.IS_ACTIVE = true;
    result.CREATE_DATE = data.CREATE_DATE;
    result.CREATE_USER = data.CREATE_USER;
    result.UPDATE_DATE = data.UPDATE_DATE;
    result.UPDATE_USER = data.UPDATE_USER;

    return result;
  }
  //-----------------------------------------------
  public addressToLocation(data: Address): Location {
    let result = new Location;

    result.ID = data.ID;
    result.LICENSE_REQ_ID = 0;
    result.TRADER_ID = data.TRADER_ID;
   
    result.LOCATION_NAME = data.LOCATION_NAME;
    result.ADDRESS_NO = data.ADDRESS_NO;
    result.BUILDING_NAME = data.BUILDING_NAME;
    result.VILLAGE = data.VILLAGE;
    result.MOO = data.MOO;
    result.SOI = data.SOI;
    result.STREET = data.STREET;
    result.DISTRICT_NAME = data.DISTRICT_NAME;
    result.SUB_PROVINCE_NAME = data.SUB_PROVINCE_NAME;
    result.PROVINCE_NAME = data.PROVINCE_NAME;
    result.POSTCODE = data.POSTCODE;
    result.PHONE_NO = data.PHONE_NO;
    result.FAX_NO = data.FAX_NO;
    result.E_MAIL_ADDRESS = data.E_MAIL_ADDRESS;
    result.FOR_PRODUCTION = data.FOR_PRODUCTION;
    result.FOR_KEEPING = data.FOR_KEEPING;
    result.NOTE1 = data.NOTE1;
    result.CREATE_DATE = data.CREATE_DATE;
    result.CREATE_USER = data.CREATE_USER;
    result.UPDATE_DATE = data.UPDATE_DATE;
    result.UPDATE_USER = data.UPDATE_USER;

    return result;
  }
  //-----------------------------------------------
  //-----------------------------------------------
  public get ProvinceList(): Array<Province> {
    return this.repoProvince.Datasource;
  }
  //-----------------------------------------------
  public get DistrictList(): Array<District> {
    return this.repoDistrict.Datasource;
  }
  //-----------------------------------------------
  public get SubDistrictList(): Array<SubDistrict> {
    return this.repoSubDistrict.Datasource;
  }
  //-----------------------------------------------
  //-----------------------------------------------
  public openForNew(callback: Function = null) {
    this.setData(new Address());
    this.openDialog(callback);
  }
  //-----------------------------------------------
  public openForEdit(data:Address, callback:Function=null) {

    this.setData(data);

    this.openDialog(callback);

    this.repoDistrict.refresh(data.PROVINCE_NAME);
    this.repoSubDistrict.refresh(data.SUB_PROVINCE_NAME);
  }

  //public clearData() {    
  //  this.setData(new Address());
  //}

  public selectSubDistrict(selectID) {
    if (!this.is_lock) {
      let selSubDistrict: any = document.getElementById(selectID);
      let data = selSubDistrict.options[selSubDistrict.selectedIndex].dataset.postcode;
      this.address.POSTCODE = data;
    }
  }
  public selectDistrict(selectID) {
    if (!this.is_lock) {
      let selDistrict: any = document.getElementById(selectID);
      let district_id = selDistrict.options[selDistrict.selectedIndex].dataset.id;

        this.address.DISTRICT_NAME = "";
        this.address.POSTCODE = "";

      if (district_id == "") {
        //this.address.SUB_PROVINCE_NAME = "";
      } else {
        this.repoSubDistrict.refresh(district_id);
      }

    }
    }

    public selectProvince(selectID) {

    if (!this.is_lock) {
        let selProvince: any = document.getElementById(selectID);
      let province_id = selProvince.options[selProvince.selectedIndex].dataset.id;

      this.address.SUB_PROVINCE_NAME = "";

      if (province_id == "") {
        this.address.DISTRICT_NAME = "";        
      } else {      
        this.repoDistrict.refresh(province_id);
      }

      
    }
  }
  // ------------------------------------
  public get hasProvince(): boolean {
    return (this.address.PROVINCE_NAME.length > 0);
  }
  public get hasDistrict(): boolean {
    return (this.address.SUB_PROVINCE_NAME.length > 0);
  }

  public changeProvince() {

    if (!this.is_lock) {

      //this.repoDistrict.refresh();


    }

  }
}
