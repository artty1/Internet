import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LicenseDocumentForUIList, ReferenceToRequest } from '../models/documentForUIList';
import { ApplicationContext } from '../../application-context';
import { LicenseType, RequestDocumentType } from '../enums/request-type.enum';
import { BaseService, DataSourceMethod } from './../base/base.service';



@Injectable({
  providedIn: 'root'
})
export class LicenseListService extends BaseService<Array<LicenseDocumentForUIList>> {

  public isWithExpired: boolean

  constructor(protected app: ApplicationContext, protected http: HttpClient) {

    super(app, http, 'license/all');
    this.isWithExpired = false
    this.data = new Array();

    this.refresh();
  }
  //------------------------------
  public get isLoad(): boolean {
    return this.isLoading;
  }
  //------------------------------
  public refresh(isWithExpired:boolean=false): Promise<boolean> {
      return this.loadData();
  }
  //------------------------------
  protected loadData(): Promise<boolean> {

    this.data.length = 0;

    let params = this.buildAPIParam_Document();
    return new Promise<boolean>((resolve, reject)=>{

      this.post(params,
        result => {

          this.data = result.data.map((row:any)=>{
            return this.mapLicenseUI(row);
          });

          resolve(true);

        }, err => {
          console.log(err);
          resolve(false);
        });
    });

  }
  //------------------------------
  public convertRequestTypeToOnScopeLicenseType(documentType: RequestDocumentType): LicenseTypeOnScopeOfSelectReference{
    let result: LicenseTypeOnScopeOfSelectReference = RequestDocumentType.Owner;

    switch(documentType){
      // case RequestDocumentType.Owner: result  = RequestDocumentType.Owner; break;
      case RequestDocumentType.Enter:
      case RequestDocumentType.EnterWithOwner: result = RequestDocumentType.Enter; break;

      case RequestDocumentType.Import:
      case RequestDocumentType.ImportWithOwner: result = RequestDocumentType.Import; break;

      case RequestDocumentType.Production:
      case RequestDocumentType.ProductionWithOwner: result = RequestDocumentType.Production; break;

      case RequestDocumentType.SendSample: result = RequestDocumentType.SendSample; break;
      case RequestDocumentType.Export: result = RequestDocumentType.Export; break;
      case RequestDocumentType.ExportSpecial: result = RequestDocumentType.ExportSpecial; break;
      case RequestDocumentType.CrossBorder: result = RequestDocumentType.CrossBorder; break;
    }

    return result;
  }
  //------------------------------
  public convertRequestTypeToLicenseType(documentType: LicenseTypeOnScopeOfSelectReference): LicenseType{

    let licenseType: LicenseType = LicenseType.Unknown;

    switch(documentType){
      case RequestDocumentType.Owner: licenseType = LicenseType.License_Owning; break;
      case RequestDocumentType.Enter: licenseType = LicenseType.License_Enter; break;
      case RequestDocumentType.Import: licenseType = LicenseType.License_Import; break;
      case RequestDocumentType.Production: licenseType = LicenseType.License_Production; break;

      case RequestDocumentType.SendSample: licenseType = LicenseType.License_Example; break;
      case RequestDocumentType.Export: licenseType = LicenseType.License_ExportYearly; break;
      case RequestDocumentType.ExportSpecial: licenseType = LicenseType.License_Export; break;
      case RequestDocumentType.CrossBorder: licenseType = LicenseType.License_CrossBorder; break;

    }

    return licenseType
  }
  public getLicenseForReferenceByDocumentType(documentType: LicenseTypeOnScopeOfSelectReference): Array<LicenseDocumentForUIList> {

    return this.getLicenseForReferenceByLicenseType(this.convertRequestTypeToLicenseType(documentType));
  }
  //------------------------------
  public getLicenseForReferenceByLicenseType(licenseType: LicenseType): Array<LicenseDocumentForUIList> {
    return this.data.filter(item => item.license_type == licenseType && item.is_active);
  }
  //------------------------------
  public get getLicenseForReference(): Array<LicenseDocumentForUIList> {
    return this.data.filter(item => item.license_type != LicenseType.License_Owning && item.is_active);
  }
  //------------------------------
  public get getOwnerLicenseForReference(): Array<LicenseDocumentForUIList> {
    return this.data.filter(item => item.license_type == LicenseType.License_Owning && item.is_active);
  }
  //------------------------------
  public getLicenseFilterByProductCode(product_code:string):Array<LicenseDocumentForUIList>{
    return this.data.filter(item => item.product_code==product_code);
  }
  //------------------------------
  private mapLicenseUI(row: any): LicenseDocumentForUIList{
    const item = new LicenseDocumentForUIList();

    item.id = row.id;
    item.product_code	 = 	row.product_code;
    item.product_name	 = 	row.product_name;
    item.reference_request_id	 = 	row.reference_request_id;
    item.reference_request_no	 = 	row.reference_request_no;
    item.reference_request_accept_date	 = 	row.reference_request_accept_date;
    item.license_no	 = 	row.license_no;
    item.license_issue_date	 =  row.license_issue_date ? new Date(row.license_issue_date) : null;
    item.license_expire_date = row.license_expire_date ? new Date(row.license_expire_date) : null;
    item.license_type	 = 	row.license_type;
    item.is_renew	 = 	row.is_renew;
    item.message	 = 	row.message;
    item.create_by	 = 	row.create_by;
    item.create_date	 = 	row.create_date;
    item.update_by	 = 	row.update_by;
    item.update_date	 = 	row.update_date;
    item.qty	 = 	row.qty;
    item.qty_unit_id	 = 	row.qty_unit_id;
    item.qty_unit_name	 = 	row.qty_unit_name;
    item.weight	 = 	row.weight;
    item.weight_unit_id	 = 	row.weight_unit_id;
    item.weight_unit_name	 = 	row.weight_unit_name;
    item.package	 = 	row.package;
    item.package_unit_id	 = 	row.package_unit_id;
    item.package_unit_name	 = 	row.package_unit_name;
    item.rest_of_qty	 = 	row.rest_of_qty;
    item.form_id	 = 	row.form_id;
    item.is_active	 = 	row.is_active;
    item.is_renew_period	 = 	row.is_renew_period;
    item.authorize_name_prefix	 = 	row.authorize_name_prefix;
    item.authorize_firstname	 = 	row.authorize_firstname;
    item.authorize_surname	 = 	row.authorize_surname;
    item.authorize_position_name	 = 	row.authorize_position_name;
    item.is_online_request	 = 	row.is_online_request;
    item.is_esignature	 = 	row.is_esignature;

    item.current_renew_to_license = new Array();
    item.current_substitue_to_license = new Array();

    // item.has_file_incluse = true;
    item.file_incluse_count = row.file_incluse_count;

    if(row.current_renew_to_license){
      row.current_renew_to_license.forEach((row:any)=>{
        const refToReq = new ReferenceToRequest();
        refToReq.id = row.id;
        refToReq.document_no = row.document_no;
        refToReq.is_draft = row.is_draft;
        refToReq.license_no = row.license_no;
        item.current_renew_to_license.push(refToReq);
      });
    }

    if(row.current_substitue_to_license){
      row.current_substitue_to_license.forEach((row:any)=>{
        const refToReq = new ReferenceToRequest();
        refToReq.id = row.id;
        refToReq.document_no = row.document_no;
        refToReq.is_draft = row.is_draft;
        refToReq.license_no = row.license_no;
        item.current_substitue_to_license.push(refToReq);
      });
    }

    if(item.license_expire_date){
      const perOneDay = (1000*60*60*24);
      const today = new Date();
      const diffDate = item.license_expire_date.valueOf() - today.valueOf();
      item.rest_of_day_to_expire = Math.round(diffDate / perOneDay);

      // item.rest_of_day_to_expire -= 310;
    }

    return item;

  } 
  //------------------------------
  public isCoupleLicense(license: LicenseDocumentForUIList):boolean {
    return (this.Datasource.filter(item => item.reference_request_id == license.reference_request_id).length > 1);
  }
  //------------------------------
}
//------------------------------------------------------------
//------------------------------------------------------------
export type LicenseTypeOnScopeOfSelectReference =
  RequestDocumentType.Enter | RequestDocumentType.Import | RequestDocumentType.Owner | RequestDocumentType.Production
  | RequestDocumentType.Export | RequestDocumentType.CrossBorder | RequestDocumentType.SendSample | RequestDocumentType.ExportSpecial
