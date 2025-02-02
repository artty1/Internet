import { LicenseOperationMonthly, CurrentDataOfLicense } from './license-operation-monthly';


export enum DraftAvailable {
  LicenseReferenceNotFound = -1,
  Available = 0,
  LicenseReferenceExpire = 1,
  DuplicateDraftOfLicense_Submited = 2
}

export class RequestDocumentForUIList {
  public id: number;
  public recevie_no: string;
  public receive_date: Date;

  public request_status: number;
  public request_type: number;

  public reference_no: string;

  public detail: string;

  public qty: number;
  public qty_unit_name: string;

  public weight: number;
  public weight_unit_name: string;


  public create_by: string;
  public create_date: Date;

  public update_by: string;
  public update_date: Date;

  public document_date: Date;


  public is_online_request: boolean;

  //public isCreateByOfficer: boolean;

  public officer_by: string;
  public officer_date: Date;

  public draft_available: DraftAvailable = DraftAvailable.DuplicateDraftOfLicense_Submited;

}

export class LicenseDocumentForUIList {
  public id:number;

  public product_code: string;
  public product_name: string;

  public reference_request_id: number;
  public reference_request_no:string;

  public reference_request_accept_date: Date;

  public license_no: string;
  public license_issue_date:Date;
  public license_expire_date:Date;
  public license_type:number;
  public is_renew:boolean;
  public message:string;

  public create_by:string;
  public create_date:Date;

  public update_by: string;
  public update_date: Date;

  public file_incluse_count: number = 0;

  // --------------------------------------------------------------
  public qty: number;
  public qty_unit_id: number;
  public qty_unit_name: string;

  public weight: number;
  public weight_unit_id: number;
  public weight_unit_name: string;

  public package: number;
  public package_unit_id: number;
  public package_unit_name: string;

  public rest_of_qty: number;
  // --------------------------------------------------------------
  public form_id: number;
  // --------------------------------------------------------------
  public is_active: boolean;
  public is_renew_period: boolean;
  // --------------------------------------------------------------
  public current_renew_to_license: Array<ReferenceToRequest>;
  public current_substitue_to_license: Array<ReferenceToRequest>;
  // --------------------------------------------------------------
  public authorize_name_prefix:string;
  public authorize_firstname:string;
  public authorize_surname:string;
  public authorize_position_name:string;
  // --------------------------------------------------------------
  public is_online_request:boolean;
  public is_esignature: boolean;
  // --------------------------------------------------------------
  public rest_of_day_to_expire: number = 0;
}

export class ReferenceToRequest
{
    public id: number;
    public is_draft: boolean;
    public document_no: string;
    public license_no: string;
}

export class License
{
    public ID: number;
    public TraderID: number;
    public ReferenceNO:string;
    public LicenseFormID: number;

    public LicenseRequestID: number;
    public LicenseNo:string;
    public Objective:string;
    public ExpireDate:Date;
    public IssueDate:Date;

    public form_id:number;

    public product_name:string;
    public product_code:string;

    public qty:number;
    public qty_unit_id:number;
    public qty_unit:string;

    public wt:number;
    public wt_unit_id:number;
    public wt_unit:string;

    constructor(public referenceLicenseNo:string=""){

    }

}

export class LicenseForReference
{
    public request_id:number;
    public request_no:string;

    public req_dtl_id:number;

    public trader_id:number;
    public has_license:License;
    public license:License;

    public operation_move_of_has_license:CurrentDataOfLicense;

    constructor(public reference_license_count: number = 0){

    }
}
