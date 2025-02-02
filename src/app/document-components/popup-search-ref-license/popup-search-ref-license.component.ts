import { Component, OnInit } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';
import { ApplicationContext } from '../../application-context';
import { LicenseListService, LicenseTypeOnScopeOfSelectReference } from '../../shared/services/license-list.service';
import { LicenseDocumentForUIList } from '../../shared/models/documentForUIList';
import { RequestDocumentType } from 'src/app/shared/enums/request-type.enum';

@Component({
  selector: 'cdss-popup-search-ref-license',
  templateUrl: './popup-search-ref-license.component.html',
  styleUrls: ['./popup-search-ref-license.component.css']
})
export class PopupSearchRefLicense extends baseModalDialog implements OnInit {

  public filterLicenseNo: string = '';
  public licenseType: string = '';

  private licenseList = new Array('ใบอนุญาตสั่งเข้า','ใบอนุญาตนำเข้า','ใบอนุญาตผลิต');

  private is_search_owner_license: boolean;
  // private is_search_owner_license: boolean;
  // --------------------------------------
  constructor(public app: ApplicationContext, public repoLicense:LicenseListService) {
    super();
    this.licenseType = this.licenseList[0];
  }
  // --------------------------------------
  ngOnInit() {

  }
  // --------------------------------------
  public get Footer(): string {
    return "";
  }
  // --------------------------------------
  public get IsSearchOwnerLicense(): boolean {
    return this.is_search_owner_license;
  }
  // --------------------------------------
  public openForSearchLicensefocusFromRequestType(reqType: RequestDocumentType, callback:Function=null) {
    
    // this.setData(false);
    // this.openDialog(callback);

    this.setDataFor(this.repoLicense.convertRequestTypeToOnScopeLicenseType(reqType));
    this.openDialog(callback);

  }
  public openForSearchLicense(callback:Function=null) {
    // this.is_search_owner_license = true;
    this.setData(false);
    this.openDialog(callback);
  }
  // --------------------------------------
  public openForSearchOwnerLicense(callback: Function = null) {
    // this.is_search_owner_license = false;
    this.setData(true);
    this.openDialog(callback);
  }
  // --------------------------------------
  // --------------------------------------
  public openForSearchLicenseExceptExport(callback:Function=null) {
    // this.is_search_owner_license = true;
    this.setData(false, true);
    this.openDialog(callback);
  }
  // --------------------------------------
  public openForSearchOwnerLicenseExceptExport(callback: Function = null) {
    // this.is_search_owner_license = false;
    this.setData(true, true);
    this.openDialog(callback);
  }
  // --------------------------------------
  public openForSearchExportLicense(callback: Function = null){
    // this.setData(false, true);

    this._licenseList = this.repoLicense.getLicenseForReference.filter((item: LicenseDocumentForUIList)=>{
      const licenseNo = item.license_type;
      return (
        (licenseNo==8) || (licenseNo==9) || (licenseNo==19) || (licenseNo==20)
      );
    });

    this.openDialog(callback);
  }
  // --------------------------------------
  // --------------------------------------
  private setDataFor(documentType: LicenseTypeOnScopeOfSelectReference){
    this._licenseList = this.repoLicense.getLicenseForReferenceByDocumentType(documentType);

  }
  // --------------------------------------
  private setData(for_search_owner: boolean, for_expect_export: boolean = false){
    this.is_search_owner_license = for_search_owner;


    if (this.is_search_owner_license) {
      this._licenseList = this.repoLicense.getOwnerLicenseForReference.filter((item: LicenseDocumentForUIList)=>{
        return true;
      });
    } else {
      this._licenseList = this.repoLicense.getLicenseForReference.filter((item: LicenseDocumentForUIList)=>{
        return true;
      });
    }

    if(for_expect_export){
      //LicenseType.License_Export = 8, LicenseType.License_CrossBorder = 9, LicenseType.License_Example = 19, LicenseType.License_ExportYearly = 20
      this._licenseList = this._licenseList.filter((item: LicenseDocumentForUIList)=>{
        const licenseNo = item.license_type;
        return (
          (licenseNo!=8) && (licenseNo!=9) && (licenseNo!=19) && (licenseNo!=20)
        );
      });
    }
    //----------------------------------------------
    // console.log('this._licenseList : ', this._licenseList);
  }
  // --------------------------------------
  public clearFilter() {
    this.filterLicenseNo = '';
  }
  // --------------------------------------
  public get isLoading(): boolean {
    return this.repoLicense.isLoading;
  }
  // --------------------------------------
  // --------------------------------------
  private _licenseList: Array<LicenseDocumentForUIList> = new Array();
  // --------------------------------------
  public get LicenseList(): Array<LicenseDocumentForUIList> {
    return this._licenseList;
  }
  // --------------------------------------
  public get EnableSearchButton(): boolean {
    return true;
  }
  // --------------------------------------
  public selectReferenceLicense(item) {
    this.innerClose(item);
  }
  // --------------------------------------
  public openForSearchReferenceLicense(product_code: string, for_search_owner_license:boolean, callback: Function = null) {
    this.is_search_owner_license = for_search_owner_license;

    this.openDialog(callback);
  }
  // --------------------------------------
}
