import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApplicationContext } from '../../application-context';
import { RequestDocument, Armament, PersonInviove, Location, RequestDocumentLogic, SubmitInfo, PrintInclude, UsageDetail, ReferenceDocument } from '../models/request-document';
import { Address } from '../models/common';
import { RequestDocumentType } from '../enums/request-type.enum';
import { BaseService } from './../base/base.service';
//import { DocumentHelper } from '../helpers/document-helper';
import { DocumentStatus } from '../enums/document-status.enum';
// import { trader_01 } from '../data/mockup-trader';
import { ServerResult } from '../models/result';
import { ProductService } from './lookup/product.service';
import { LicenseForReference, License } from '../models/documentForUIList';
import { Product, ProductGroup } from '../models/lookup';
import { ProductGroupService } from './lookup/product-group.service';
import { LicenseOperationMonthly } from '../models/license-operation-monthly';
import { UploadService } from 'src/app/document-components/section-file-include/upload.service';
import { RequestFileInclude } from 'src/app/document-components/section-file-include/models';
import { DateConvertorService } from '../helpers/date-convertor.service';
import { isArray } from 'util';



@Injectable({
  providedIn: 'root'
})

// export class RequestDocumentService extends BaseService<RequestDocument> {
export class RequestDocumentService extends BaseService<RequestDocument> {

  private paymentMethodList: Array<any>;
  public currentDocument: RequestDocument;

  private _groupOfImport = [
    RequestDocumentType.Owner, RequestDocumentType.OwnerReferEnter, RequestDocumentType.OwnerReferImport, RequestDocumentType.OwnerReferProduction,
    RequestDocumentType.Enter, RequestDocumentType.EnterWithOwner, RequestDocumentType.Import, RequestDocumentType.ImportWithOwner, RequestDocumentType.Production, RequestDocumentType.ProductionWithOwner,

    RequestDocumentType.Renewal_Owner, RequestDocumentType.Renewal_Enter, RequestDocumentType.Renewal_Import, RequestDocumentType.Renewal_Production,
    RequestDocumentType.Substitute_Owner, RequestDocumentType.Substitute_Enter, RequestDocumentType.Substitute_Import, RequestDocumentType.Substitute_Production
  ];
  private _groupOfExport = [
    RequestDocumentType.OwnerReferSendSample, RequestDocumentType.OwnerReferExport, RequestDocumentType.OwnerReferExportSpecial, RequestDocumentType.OwnerReferCrossBorder,
    RequestDocumentType.SendSample, RequestDocumentType.SendSampleWithOwner, RequestDocumentType.Export, RequestDocumentType.ExportWithOwner, RequestDocumentType.ExportSpecial, RequestDocumentType.ExportSpecialWithOwner, RequestDocumentType.CrossBorder, RequestDocumentType.CrossBorderWithOwner,

    RequestDocumentType.Renewal_SendSample, RequestDocumentType.Renewal_Export, RequestDocumentType.Renewal_ExportSpecial, RequestDocumentType.Renewal_CrossBorder,
    RequestDocumentType.Substitute_SendSample, RequestDocumentType.Substitute_Export, RequestDocumentType.Substitute_ExportSpecial, RequestDocumentType.Substitute_CrossBorder
  ];
  
  private _groupOfRenew = [
    RequestDocumentType.Renewal, 
    RequestDocumentType.Renewal_Owner, RequestDocumentType.Renewal_Enter, RequestDocumentType.Renewal_Import, RequestDocumentType.Renewal_Production,
    RequestDocumentType.Renewal_SendSample, RequestDocumentType.Renewal_Export, RequestDocumentType.Renewal_ExportSpecial, RequestDocumentType.Renewal_CrossBorder,

    RequestDocumentType.Substitute, 
    RequestDocumentType.Substitute_Owner, RequestDocumentType.Substitute_Enter, RequestDocumentType.Substitute_Import, RequestDocumentType.Substitute_Production, 
    RequestDocumentType.Substitute_SendSample, RequestDocumentType.Substitute_Export, RequestDocumentType.Substitute_ExportSpecial, RequestDocumentType.Substitute_CrossBorder
  ];
  private _groupOfSubstitute = [

  ];
  

  //-------------------------------------------------
  constructor(
    protected app: ApplicationContext,
    protected http: HttpClient,
    private repoProduct:ProductService,
    private repoProductGroup:ProductGroupService,
    private dateHelper: DateConvertorService
  ) {
    super(app, http, '');

    this.init();

  }
  //-------------------------------------------------
  public get isLock():boolean{
    return (this.currentDocument.SUBMIT_STATUS == 1);
  }
  //-------------------------------------------------
  public get currentRequestType(): RequestDocumentType {
    // return this.currentDocType;
    return this.currentDocument.LogicOfDocument.requestType;
  }
  //-------------------------------------------------
  public createNewRequest(reqType: RequestDocumentType) {
    let newDoc = new RequestDocument();

    newDoc.LogicOfDocument = new RequestDocumentLogic();

    // newDoc.LogicOfDocument.payment_method = "C";
    newDoc.LogicOfDocument.payment_method = "B";
    newDoc.LogicOfDocument.requestType = reqType;

    newDoc.CREATE_USER = this.app.currentUser.user_code;
    newDoc.UPDATE_USER = this.app.currentUser.user_code;
    newDoc.TRADER_ID = this.app.currentUser.trader_id;

    newDoc.Armament.ProductGroupID = 0;
    newDoc.Armament.PRODUCT_CODE = "";

    newDoc.PrintIncludeList = new Array();

    this.currentDocument = newDoc;
  }

  //-------------------------------------------------
  private init() {

    this.is_loading = true;

    this.paymentMethodList = new Array();
    this.paymentMethodList.push({ code: '', title: 'วิธีการชำระเงิน' });
    this.paymentMethodList.push({ code: 'C', title: 'เงินสด-เช็ค' });          // convert to blank for update into Database
    this.paymentMethodList.push({ code: 'B', title: 'Bill Payment' });
    this.paymentMethodList.push({ code: 'N', title: 'NSW E-Payment' });

    this.createNewRequest(RequestDocumentType.NONE);

    this.is_loading = false;

  }
  //-------------------------------------------------
  public get LocationForStock(): Array<Location> {
    return this.currentDocument.Locations.filter(item => item.FOR_KEEPING == 1);
  }
  //-------------------------------------------------
  public get LocationForProduction(): Array<Location> {
    return this.currentDocument.Locations.filter(item => item.FOR_PRODUCTION == 1);
  }
  //-------------------------------------------------
  public createRenew(req_id: number = 0, license_id: number = 0, callback = Function = null) {

    this.is_loading = true;

    let param = this.buildAPIParam_DocumentRequestReference(req_id, license_id);
    let url = this.buildAPIURL('request/reNewRequest');

    this.app.ShowWaitingDialog();

    this.postToURL(url, param,
      (result: ServerResult) => {
        // console.log('ReferenceDocument : ', JSON.parse(JSON.stringify(result.data.ReferenceDocument)));

        this.currentDocument = result.data;

        console.log('currentDocument: ', this.currentDocument);

        if (!this.currentDocument.Armament) {
          this.currentDocument.Armament = new Armament();
        }

        // this.currentDocument.Locations = new Array();
        this.currentDocument.PersonOfAttorney = new Array();
        this.currentDocument.PersonOfCommittee = new Array();
        // this.currentDocument.Armament.QUANTITY = 0;

        // #2023-04-05 ------------------------------------------------
        this.currentDocument.LogicOfDocument.payment_method = "B";
        this.currentDocument.PAYMENT_METHOD =  this.currentDocument.LogicOfDocument.payment_method;
        // #2023-04-05 ------------------------------------------------

        this.app.CloseWaitingDialog();

        if (callback != null) {

          this.repoProduct.CurrentGroupID = this.currentDocument.Armament.ProductGroupID;
          this.repoProduct.refresh();

          callback(true, 'create renew document success.');
        }

      }, (error: ServerResult) => {
        console.log('Error : ', error);

        this.app.CloseWaitingDialogWithError(error);

        if (callback != null) {
          callback(false, 'create renew document error. : ', error);
        }

      });

  }
  //-------------------------------------------------
  public createSubstitue(license_id: number = 0, callback = Function = null) {

    this.is_loading = true;

    let param = this.buildAPIParam_DocumentRequestReference(0, license_id);
    let url = this.buildAPIURL('request/newSubstitueRequest');

    //this.repoProduct.clearData();

    this.app.ShowWaitingDialog();

    this.postToURL(url, param,
      (result: ServerResult) => {
        // console.log('Result : ', result);
        this.currentDocument = result.data;

        if (this.currentDocument.Armament == null) {
          this.currentDocument.Armament = new Armament();
        }

        if (callback != null) {

          this.repoProduct.CurrentGroupID = this.currentDocument.Armament.ProductGroupID;
          this.repoProduct.refresh();
          callback(true, 'create substitue document success.');
          this.app.CloseWaitingDialog();
          // console.log('this.currentDocument : ', this.currentDocument);
        }

      }, (error: ServerResult) => {
        console.log('Error : ', error);

        if (callback != null) {
          callback(false, 'create substitue document error. : ', error);
        }

        this.app.CloseWaitingDialogWithError(error);

      });

  }
  //-------------------------------------------------
  public copyDocument(doc_id:number, callback:Function){

    this.loadDraftDocument(doc_id, (isOK: boolean, resp: any)=>{

      console.log('copyDocument => loadDraftDocument : ',isOK, resp);
      if(isOK){
        this.currentDocument.ID = 0;
        this.currentDocument.STATUS = 0;
        this.currentDocument.SUBMIT_STATUS = 0;

        this.currentDocument.CREATE_DATE = new Date();
        // this.currentDocument.CREATE_USER = this.app.currentUser.user_code;
        this.currentDocument.UPDATE_DATE = new Date();
        // this.currentDocument.UPDATE_USER = this.app.currentUser.user_code;
        this.currentDocument.DOCUMENT_DATE = null;
        this.currentDocument.DOCUMENT_NO = "";
        //this.currentDocument.IS_CANCELED = 0;    // move line of code to #2021-12-17
        //this.currentDocument.IS_LOCK = 0;    // move line of code to #2021-12-17
        this.currentDocument.REGISTER_DATE = null;

        this.currentDocument.submit_message = '';
        this.currentDocument.SubmitInfoHistory = new Array();

        this.currentDocument.REGISTER_DATE = null;
        this.currentDocument.REGISTER_NO = '';
        this.currentDocument.REGISTER_USER = '';

        // #2021-12-17: fixed effect copy data  -----------------------
        this.currentDocument.IS_LOCK = 0;
        this.currentDocument.UNLOCK_DATE = null;
        this.currentDocument.UNLOCK_USER = null;
        this.currentDocument.UNLOCK_DESCRIPTION = "";
        this.currentDocument.IS_CANCELED = 0;
        this.currentDocument.CANCELED_DATE = null;
        this.currentDocument.CANCELED_USER = null;
        this.currentDocument.PAYMENT_STATUS = "";
        this.currentDocument.PAYMENT_CHECKING_STATUS = "";
        this.currentDocument.RECEIVE_ID = 0;
        this.currentDocument.LogicOfDocument.payment_method = this.currentDocument.PAYMENT_METHOD = "C";
        this.currentDocument.PAYMENT_INFORM_ID = 0;
        this.currentDocument.FAST_TRACK_PRIORITY = 0;
        this.currentDocument.FAST_TRACK_UPD_USER = null;
        // #2021-12-17 ------------------------------------------------



        // #2022-01-11: fixed effect copy data  -----------------------
        this.currentDocument.LICENSE_INFORM_DATE = null;
        this.currentDocument.LICENSE_INFORM_NO = "";

        // #2022-01-11 ------------------------------------------------

        // #2023-03-23 ------------------------------------------------
        this.currentDocument.LogicOfDocument.payment_method = "B";
        this.currentDocument.PAYMENT_METHOD =  this.currentDocument.LogicOfDocument.payment_method;
        // #2023-03-23 ------------------------------------------------
        callback(true, resp);
      }else{
        // this.app.sho
        callback(false, resp);
      }

    });

  }
  //-------------------------------------------------
  public loadDraftDocument(draft_id:number, callback:Function=null) {

    let params = this.buildAPIParam_Document(draft_id);
    let url = this.buildAPIURL('request/detail');

    this.is_loading = true;
    this.app.ShowWaitingDialog();
    this.createNewRequest(RequestDocumentType.NONE);

    const callbackOK = (result:ServerResult)=>{

      this.is_loading = false;
      // this.data = result.data;
      let is_data_ok = !result.has_error;

      console.log('load doc: ', result.data);

      if (is_data_ok) {
        this.currentDocument = JSON.parse(JSON.stringify(result.data));
        // console.log('OK result : ', JSON.parse(JSON.stringify(result.data)));
        this.mappingSubmitInfo(result.data);
        this.mappingReferenceDocument(result.data);
        this.mappingAmament(result.data);

        this.currentDocument.fileInclude = new RequestFileInclude();

        this.repoProduct.CurrentGroupID = this.currentDocument.Armament.ProductGroupID;
        this.repoProduct.refresh();
        this.app.CloseWaitingDialog();

        this.setDefaultForUI();

      }

      if (callback) callback(is_data_ok, result.message);
    }
    const callbackError = (err:ServerResult)=>{
      this.is_loading = false;
      if (callback) callback(false, err.message);
      this.app.CloseWaitingDialogWithError(err);
    }



    this.http.post(url, params).subscribe((resp:any)=>{
      const result = ServerResult.setServerResult(resp);

      if(!resp.has_error){
        callbackOK(resp);
      }else{
        callbackError(resp);
      }
    });

  }
  //-------------------------------------------------
  public loadRejectDocument(doc_id:number) {
    this.is_loading = true;
    //this.mockupLoading();
  }
  //-------------------------------------------------
  public get PaymentMethodList(): Array<any> {
    return this.paymentMethodList;
  }
  //-------------------------------------------------
  public get PaymentMethod(): string {
    return this.currentDocument.LogicOfDocument.payment_method;
  }
  //-------------------------------------------------
  public set PaymentMethod(value: string) {
    if (value == 'C' || value == 'B' || value == 'N') {
      this.currentDocument.LogicOfDocument.payment_method = value;
    } else {
      this.currentDocument.LogicOfDocument.payment_method = '';
    }

  }
  //-------------------------------------------------
  public get PaymentMethodName(): string {
    let result = "";

    let pMethod = this.getDataFromObjectArray(this.paymentMethodList, "code", this.currentDocument.LogicOfDocument.payment_method);

    if (pMethod != null) result = pMethod.title;

    return result;
  }
  //-------------------------------------------------
  private saveFileInclude(docId: number, fileInclude: RequestFileInclude, callback:Function=null){

    const uploadService = new UploadService(this.app, this.http);
    uploadService.saveAllIncludeFile(docId, fileInclude, (isOK:boolean, data:any)=>{

      this.currentDocument.fileInclude = new RequestFileInclude();

      if(callback){
        callback(isOK, data);
      }
    });


  }
  //-------------------------------------------------
  public saveDraft(callback: Function) {

    this.packDataBeforePostToServer(false);
    this.getSomethingFrom_ReqDtl_to_ReqDtlExp();

    let params = this.buildAPIParam_RequestDocumentDetail(this.currentDocument.ID, this.currentDocument);
    let url = this.buildAPIURL('request/saveDraft');

    this.is_loading = true;

    this.app.ShowWaitingDialog("กำลังบันทึกร่างคำขอ....");

    const fileInclude = this.currentDocument.fileInclude;
    this.postToURL(url, params,
      (result:any) => {

        this.app.requestUpdateDraftList = true;
        this.is_loading = false;

        if (this.currentDocument.STATUS == 2) this.app.requestUpdateSubmitList = true;

        if((this.currentRequestType <= RequestDocumentType.Substitute_CrossBorder) || (this.currentRequestType >= RequestDocumentType.Substitute)){
          this.app.requestUpdateLicenseList = true;
        }

        const currentSaveID = result.data.ID

        this.saveFileInclude(currentSaveID, fileInclude, (isOK:boolean, data:any)=>{
          this.app.CloseWaitingDialog();
          callback(true, result.message);
        });

      }, (err:ServerResult) => {
        this.is_loading = false;
        this.app.CloseWaitingDialogWithError(err);
        callback(false, err.message);
      });
  }
  //-------------------------------------------------
  public saveSubmit(callback: Function) {

    this.packDataBeforePostToServer(true);
    this.getSomethingFrom_ReqDtl_to_ReqDtlExp();

    let params = this.buildAPIParam_RequestDocumentDetail(this.currentDocument.ID, this.currentDocument, true);
    let url = this.buildAPIURL('request/saveDraft');
    this.is_loading = true;
    const fileInclude = this.currentDocument.fileInclude;
    this.app.ShowWaitingDialog("กำลังบันทึกข้อมูลคำขอเพื่อยื่นให้เจ้าหน้าที่...");

    this.postToURL(url, params,
      (result:any) => {
        const reqId = result.data.ID;
        this.app.requestUpdateDraftList = true;
        this.app.requestUpdateSubmitList = true;

        this.saveFileInclude(reqId, fileInclude, (isOK:boolean, data:any)=>{
          this.app.CloseWaitingDialog();
          callback(true, result.message);
          this.is_loading = false;
        });

      }, (err:ServerResult) => {
        console.log(err);
        callback(false, err.message);
        this.is_loading = false;

        this.app.CloseWaitingDialogWithError(err);

      });

  }
  //-------------------------------------------------
  private getSomethingFrom_ReqDtl_to_ReqDtlExp(){

      const dtl = this.currentDocument.Armament;

      this.currentDocument.ReferenceDocument.WEIGHT_UNIT_ID = dtl.WEIGHT_UNIT_ID;

      this.currentDocument.ReferenceDocument.QUANTITY_UNIT_ID = dtl.QUANTITY_UNIT_ID;
      this.currentDocument.ReferenceDocument.QUANTITY = dtl.QUANTITY;
  }
  //-------------------------------------------------
  private packDataBeforePostToServer(forSubmit:boolean = false) {

    if ((this.currentDocument.ReferenceDocument.DetailsOfUsage != null) && (this.currentDocument.ReferenceDocument.DetailsOfUsage.length > 0)){
      let usages = this.currentDocument.ReferenceDocument.DetailsOfUsage.filter(item => {
        return item.USE_DATE != null;
      });

      this.currentDocument.ReferenceDocument.DetailsOfUsage = usages;
    }

    this.currentDocument.Armament.ImportFromCounties = this.currentDocument.Armament.ImportFromCounties.filter((item: string)=>{
      return (item && item.trim().length>0);
    });
    this.currentDocument.Armament.ExportToCounties = this.currentDocument.Armament.ExportToCounties.filter((item: string)=>{
      return (item && item.trim().length>0);
    });

  }
  //-------------------------------------------------
  //-------------------------------------------------
  public ClearReferenceLicense(){

    this.currentDocument.ReferenceDocument.REF_LICENSE_NO = null;
    this.currentDocument.ReferenceDocument.REF_LICENSE_ISSUE_DATE = null;
    this.currentDocument.ReferenceDocument.REF_LICENSE_EXPIRY_DATE = null;
    this.currentDocument.ReferenceDocument.REF_LICENSE_FORM_ID = null;
    this.currentDocument.ReferenceDocument.REF_LICENSE_QTY = null;
    this.currentDocument.ReferenceDocument.REF_LICENSE_QTY_UNIT_ID = null;
    this.currentDocument.ReferenceDocument.REF_LICENSE_WT = null;
    this.currentDocument.ReferenceDocument.REF_LICENSE_WT_UNIT_ID = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_ISSUE_DATE = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_EXPIRY_DATE = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_FORM_ID = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY_UNIT_ID = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT = null;
    this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT_UNIT_ID = null;

    this.currentDocument.ReferenceDocument.DetailsOfUsage.length = 0;
    this.currentDocument.OWNER_REF_LICENSE_TYPE = 0;

  }
  //-------------------------------------------------
  public SetReferenceLicense(data: LicenseForReference, withSet_ProductRef: boolean = true, withSet_OperationMonthly: boolean = false){

    // ---------------------------------------------------------------------------
    let usage_data:Array<LicenseOperationMonthly> = data.operation_move_of_has_license.operation_move;

    this.currentDocument.ReferenceDocument.renewCount = data.reference_license_count;

    if(this.currentDocument.ReferenceDocument.renewCount>1){
      this.currentDocument.ReferenceDocument.ACTUAL_QUANTITY = 0
    }

    if(withSet_OperationMonthly){
      this.currentDocument.ReferenceDocument.DetailsOfUsage.length = 0;
      usage_data.forEach((item:LicenseOperationMonthly, index:number)=>{

        let usage:UsageDetail = new UsageDetail();

        usage.ITEM_NO = item.item_no;
        usage.IS_CURRENT_STOCK = 0;
        usage.USE_DATE = new Date(item.year_no, item.month_no-1, 1);
        usage.USE_QUANTITY = item.summary;
        usage.LICENSE_REQ_DTL_EXP_ID = data.req_dtl_id;
        usage.REMAIN_QUANTITY = item.remain_qty;
        // }

        usage.LICENSE_REQ_DTL_EXP_ID = data.req_dtl_id;

        usage.SALE_QUANTITY = item.summary;
        usage.USE_QUANTITY = item.summary;
        usage.REMAIN_QUANTITY = data.operation_move_of_has_license.remaining_qty;

        this.currentDocument.ReferenceDocument.DetailsOfUsage.push(usage);

      });

      const currentUsage = new UsageDetail();
      currentUsage.ITEM_NO = usage_data.length+1; // 4;
      currentUsage.IS_CURRENT_STOCK = 1;
      currentUsage.USE_DATE = data.operation_move_of_has_license.remaining_date;
      currentUsage.REMAIN_QUANTITY = data.operation_move_of_has_license.remaining_qty;
      currentUsage.LICENSE_REQ_DTL_EXP_ID = data.req_dtl_id;
      currentUsage.QUANTITY_UNIT_ID = 0;
      currentUsage.SALE_QUANTITY = 0;
      currentUsage.USE_QUANTITY = 0;

      this.currentDocument.ReferenceDocument.DetailsOfUsage.push(currentUsage);

      // console.log(this.currentDocument.ReferenceDocument.DetailsOfUsage, usage_data);

    }
    // ---------------------------------------------------------------------------
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Disabled change license ref form first license to previous license (renew 3 => refer 2, not refer 1)
    // https://app.clickup.com/t/860puqm0d
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if(withSet_ProductRef){

      if(data.license==null){
        this.currentDocument.ReferenceDocument.REF_LICENSE_NO = null;
        this.currentDocument.ReferenceDocument.REF_LICENSE_ISSUE_DATE = null;
        this.currentDocument.ReferenceDocument.REF_LICENSE_EXPIRY_DATE = null;
        this.currentDocument.ReferenceDocument.REF_LICENSE_FORM_ID = null;
        this.currentDocument.ReferenceDocument.REF_LICENSE_QTY = null;
        this.currentDocument.ReferenceDocument.REF_LICENSE_QTY_UNIT_ID = null;
        this.currentDocument.ReferenceDocument.REF_LICENSE_WT = null;
        this.currentDocument.ReferenceDocument.REF_LICENSE_WT_UNIT_ID = null;

        this.currentDocument.ReferenceDocument.refLicenseQTYUnitText = null;
        this.currentDocument.ReferenceDocument.refLicenseWeightUnitText = null;

      }else{
        this.currentDocument.ReferenceDocument.REF_LICENSE_NO = data.license.LicenseNo;
        this.currentDocument.ReferenceDocument.REF_LICENSE_ISSUE_DATE = data.license.IssueDate;
        this.currentDocument.ReferenceDocument.REF_LICENSE_EXPIRY_DATE = data.license.ExpireDate;
        this.currentDocument.ReferenceDocument.REF_LICENSE_FORM_ID = data.license.form_id;
        this.currentDocument.ReferenceDocument.REF_LICENSE_QTY = data.license.qty;
        this.currentDocument.ReferenceDocument.REF_LICENSE_QTY_UNIT_ID = data.license.qty_unit_id;
        this.currentDocument.ReferenceDocument.REF_LICENSE_WT = data.license.wt;
        this.currentDocument.ReferenceDocument.REF_LICENSE_WT_UNIT_ID = data.license.wt_unit_id;

        this.currentDocument.ReferenceDocument.refLicenseQTYUnitText = data.license.qty_unit;
        this.currentDocument.ReferenceDocument.refLicenseWeightUnitText = data.license.wt_unit;

        this.currentDocument.OWNER_REF_LICENSE_TYPE = data.license.LicenseFormID;

      }
      // -----------------------------------
      if(data.has_license==null){
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO = null;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_ISSUE_DATE = null;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_EXPIRY_DATE = null;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_FORM_ID = null;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY = null;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY_UNIT_ID = null;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT = null;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT_UNIT_ID = null;

        this.currentDocument.ReferenceDocument.refHasLicenseQTYUnitText = null;
        this.currentDocument.ReferenceDocument.refHasLicenseWeightUnitText = null;

        this.currentDocument.OWNER_REF_LICENSE_TYPE = null;

      }else{
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO = data.has_license.LicenseNo;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_ISSUE_DATE = data.has_license.IssueDate;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_EXPIRY_DATE = data.has_license.ExpireDate;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_FORM_ID = data.has_license.form_id;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY = data.has_license.qty;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_QTY_UNIT_ID = data.has_license.qty_unit_id;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT = data.has_license.wt;
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_WT_UNIT_ID = data.has_license.wt_unit_id;

        this.currentDocument.ReferenceDocument.refHasLicenseQTYUnitText = data.has_license.qty_unit;
        this.currentDocument.ReferenceDocument.refHasLicenseWeightUnitText = data.has_license.wt_unit;

        this.currentDocument.ReferenceDocument.REMAIN_QUANTITY = data.operation_move_of_has_license.remaining_qty;
        this.currentDocument.ReferenceDocument.REMAIN_QUANTITY_DATE = data.operation_move_of_has_license.remaining_date;

        if(data.license==null){
          this.currentDocument.OWNER_REF_LICENSE_TYPE = 0;
        }


      }

    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if(data.has_license || data.license){
      this.currentDocument.ReferenceDocument.REMAIN_QUANTITY = data.operation_move_of_has_license.remaining_qty;
      this.currentDocument.ReferenceDocument.REMAIN_QUANTITY_DATE = data.operation_move_of_has_license.remaining_date;
    }else{
      this.currentDocument.ReferenceDocument.REMAIN_QUANTITY = null;
      this.currentDocument.ReferenceDocument.REMAIN_QUANTITY_DATE = null;
    }

  }
  //-------------------------------------------------
  public SetProductToArmament(product: Product, requestObjective:string="") {
    if (product == null) {
      this.currentDocument.Armament.TARIFF_CODE = "";
      this.currentDocument.Armament.STATISTICAL_CODE = "";
      this.currentDocument.Armament.PRODUCT_CODE = "";
      this.currentDocument.Armament.QUANTITY_UNIT_ID = 0;
      this.currentDocument.Armament.WEIGHT_UNIT_ID = 0;
      this.currentDocument.Armament.PRODUCT_NAME = "";
      this.currentDocument.Armament.PRODUCT_BRAND_NAME = "";
      this.currentDocument.Armament.ProductGroupID = 0;
      this.currentDocument.Armament.OBJECTIVE = "";

    } else {

      if (product.TariffCode != null && product.TariffCode.trim().length > 0) this.currentDocument.Armament.TARIFF_CODE = product.TariffCode;
      if (product.StatisticCode != null && product.StatisticCode.trim().length > 0) this.currentDocument.Armament.STATISTICAL_CODE = product.StatisticCode;

      this.currentDocument.Armament.PRODUCT_CODE = product.Code;
      this.currentDocument.Armament.QUANTITY_UNIT_ID = product.QuantityUnitID;
      this.currentDocument.Armament.WEIGHT_UNIT_ID = product.WeightUnitID;

      this.currentDocument.Armament.PRODUCT_NAME = product.Name;

      if (this.currentDocument.Armament.PRODUCT_BRAND_NAME == null || this.currentDocument.Armament.PRODUCT_BRAND_NAME.trim().length == 0) {
        this.currentDocument.Armament.PRODUCT_BRAND_NAME = "NO BRAND";
      }

      if(this.currentDocument.Armament.ProductGroupID!=product.GroupID) this.currentDocument.Armament.ProductGroupID = product.GroupID;

      this.currentDocument.Armament.OBJECTIVE = requestObjective;

    }
  }
  // ------------------------------------------------
  public get Products():Array<Product>{
    return this.repoProduct.Datasource;
  }
  // ------------------------------------------------
  public get ProductGroups():Array<ProductGroup>{
    return this.repoProductGroup.Datasource;
  }
  // ------------------------------------------------
  public rejectSubmit(): Promise<any>{
    console.log('rejectSubmit ', this.currentDocument.ID);

    return new Promise((resolve, reject)=>{
      reject('method unavailable');
    });

  }
  // ------------------------------------------------
  public rejectSubmitDcoumentID(id:number): Promise<any>{
    console.log('rejectSubmit ', id);

    return new Promise((resolve, reject)=>{
      reject('method unavailable');
    });

  }
  // ------------------------------------------------
  public get hasLicenseReference():boolean{
    return (
      (
        this.currentDocument.ReferenceDocument.REF_LICENSE_NO && this.currentDocument.ReferenceDocument.REF_LICENSE_NO.length > 0
      ) ||
      (
        this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO && this.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO.length > 0
      )
    )
  }
  // ------------------------------------------------
  private setDefaultForUI(){

    if(!this.currentDocument.Armament.ExportToCounties || !Array.isArray(this.currentDocument.Armament.ExportToCounties)){
      this.currentDocument.Armament.ExportToCounties = new Array();
    }
    if(this.currentDocument.Armament.ExportToCounties.length==0){
      this.currentDocument.Armament.ExportToCounties.push('');
    }
    //******************************************************************** */
    const defaultCountry = 3;
    if(!this.currentDocument.Armament.ImportFromCounties || !Array.isArray(this.currentDocument.Armament.ImportFromCounties)){
      this.currentDocument.Armament.ImportFromCounties = new Array();
    }
    if(this.currentDocument.Armament.ImportFromCounties.length<defaultCountry){
      const restOfAll = defaultCountry - this.currentDocument.Armament.ImportFromCounties.length;
      this.currentDocument.Armament.ImportFromCounties.push(...Array(restOfAll).fill(''));
    }

  }
  //-------------------------------------------------
  private mappingAmament(apiData:any){

    const armament = apiData.Armament;
 
    if(!this.currentDocument.Armament.ExportToCounties) this.currentDocument.Armament.ExportToCounties = new Array();
    if(this.currentDocument.Armament.ExportToCounties.length==0) this.currentDocument.Armament.ExportToCounties.push('');

    if(!this.currentDocument.Armament.ImportFromCounties) this.currentDocument.Armament.ImportFromCounties = new Array();
    if(this.currentDocument.Armament.ImportFromCounties.length==0) this.currentDocument.Armament.ImportFromCounties.push(...['','', '']);


    if(armament.ImportFromCounties && Array.isArray(armament.ImportFromCounties)){
      this.currentDocument.Armament.ImportFromCounties = armament.ImportFromCounties;
    }

    if(armament.ExportToCounties && Array.isArray(armament.ExportToCounties)){
      this.currentDocument.Armament.ExportToCounties = armament.ExportToCounties;
    }


  }
  //-------------------------------------------------
  private mappingSubmitInfo(apiData:any){

    if(apiData.SubmitInfoHistory){
      apiData.SubmitInfoHistory.forEach((row:any)=>{

        const sInfo = new SubmitInfo();
        sInfo.ID  = row.ID;
        sInfo.SUBMIT_TYPE  = row.SUBMIT_TYPE;
        sInfo.DOCUMENT_SUBMIT_ID  = row.DOCUMENT_SUBMIT_ID;
        sInfo.SUBMIT_DATE  = row.SUBMIT_DATE ? new Date(row.SUBMIT_DATE) : null;
        sInfo.SUBMIT_USER  = row.SUBMIT_USER ? row.SUBMIT_USER : "";
        sInfo.SUBMIT_COMMENT  = row.SUBMIT_COMMENT ? row.SUBMIT_COMMENT : "";
        sInfo.OFFICER_COMMENT_DATE  = row.OFFICER_COMMENT_DATE ? new Date(row.OFFICER_COMMENT_DATE) : null;
        sInfo.OFFICER_USER  = row.OFFICER_USER ? row.OFFICER_USER : "";
        sInfo.OFFICER_NAME  = row.OFFICER_NAME ? row.OFFICER_NAME : "";
        sInfo.OFFICER_COMMENT  = row.OFFICER_COMMENT ? row.OFFICER_COMMENT : "";
        sInfo.CREATE_DATE  = row.CREATE_DATE ? new Date(row.CREATE_DATE) : null;
        sInfo.CREATE_USER  = row.CREATE_USER ? row.CREATE_USER : "";
        sInfo.UPDATE_DATE  = row.UPDATE_DATE ? new Date(row.UPDATE_DATE) : null;
        sInfo.UPDATE_USER  = row.UPDATE_USER ? row.UPDATE_USER : "";

      });

    }else{
      this.currentDocument.SubmitInfoHistory = new Array();
    }

    this.currentDocument.SubmitInfoHistory.forEach((item: SubmitInfo)=>{

      if(!item.SUBMIT_COMMENT) item.SUBMIT_COMMENT = "";
      if(!item.OFFICER_COMMENT) item.OFFICER_COMMENT = "";

      item.SUBMIT_COMMENT = item.SUBMIT_COMMENT.split("\n").join('<br />');
      item.OFFICER_COMMENT = item.OFFICER_COMMENT.split("\n").join('<br />');

    });

  }
  //-------------------------------------------------
  private mappingReferenceDocument(apiData:any){

    if(apiData.ReferenceDocument){

      const row = apiData.ReferenceDocument;
      const refDoc = new ReferenceDocument();

      refDoc.ID = row.ID;
      refDoc.LICENSE_REQ_DTL_ID = row.LICENSE_REQ_DTL_ID;
      refDoc.PAGE_NO = row.PAGE_NO;
      refDoc.REF_LICENSE_FORM_ID = row.REF_LICENSE_FORM_ID;
      refDoc.REF_LICENSE_NO = row.REF_LICENSE_NO;
      refDoc.REF_LICENSE_ISSUE_DATE = row.REF_LICENSE_ISSUE_DATE ? new Date(row.REF_LICENSE_ISSUE_DATE) : null;
      refDoc.REF_LICENSE_EXPIRY_DATE = row.REF_LICENSE_EXPIRY_DATE ? new Date(row.REF_LICENSE_EXPIRY_DATE) : null;
      refDoc.REF_LICENSE_QTY = row.REF_LICENSE_QTY;
      refDoc.REF_LICENSE_QTY_UNIT_ID = row.REF_LICENSE_QTY_UNIT_ID;
      refDoc.REF_LICENSE_WT = row.REF_LICENSE_WT;
      refDoc.REF_LICENSE_WT_UNIT_ID = row.REF_LICENSE_WT_UNIT_ID;
      refDoc.REF_HAS_LICENSE_FORM_ID = row.REF_HAS_LICENSE_FORM_ID;
      refDoc.REF_HAS_LICENSE_NO = row.REF_HAS_LICENSE_NO;
      refDoc.REF_HAS_LICENSE_ISSUE_DATE = row.REF_HAS_LICENSE_ISSUE_DATE ? new Date(row.REF_HAS_LICENSE_ISSUE_DATE) : null;
      refDoc.REF_HAS_LICENSE_EXPIRY_DATE = row.REF_HAS_LICENSE_EXPIRY_DATE ? new Date(row.REF_HAS_LICENSE_EXPIRY_DATE) : null;
      refDoc.REF_HAS_LICENSE_QTY = row.REF_HAS_LICENSE_QTY;
      refDoc.REF_HAS_LICENSE_QTY_UNIT_ID = row.REF_HAS_LICENSE_QTY_UNIT_ID;
      refDoc.REF_HAS_LICENSE_WT = row.REF_HAS_LICENSE_WT;
      refDoc.REF_HAS_LICENSE_WT_UNIT_ID = row.REF_HAS_LICENSE_WT_UNIT_ID;
      refDoc.REF_ADJUST_QTY = row.REF_ADJUST_QTY;
      refDoc.REF_ADJUST_QTY_UNIT_ID = row.REF_ADJUST_QTY_UNIT_ID;
      refDoc.REF_ADJUST_REASON = row.REF_ADJUST_REASON;
      refDoc.IMPORT_COUNT_OF_YEAR = row.IMPORT_COUNT_OF_YEAR;
      refDoc.IMPORT_OF_YEAR = row.IMPORT_OF_YEAR;
      refDoc.LAST_HAS_PRODUCT_NAME = row.LAST_HAS_PRODUCT_NAME;
      refDoc.LAST_HAS_LICENSE_NO = row.LAST_HAS_LICENSE_NO;
      refDoc.LAST_HAS_LICENSE_ISSUE_DATE = row.LAST_HAS_LICENSE_ISSUE_DATE ? new Date(row.LAST_HAS_LICENSE_ISSUE_DATE) : null;
      refDoc.LAST_HAS_QUANTITY = row.LAST_HAS_QUANTITY;
      refDoc.LAST_HAS_QUANTITY_UNIT_ID = row.LAST_HAS_QUANTITY_UNIT_ID;
      refDoc.LAST_LICENSE_NO = row.LAST_LICENSE_NO;
      refDoc.LAST_LICENSE_ISSUE_DATE = row.LAST_LICENSE_ISSUE_DATE ? new Date(row.LAST_LICENSE_ISSUE_DATE) : null;
      refDoc.QUANTITY = row.QUANTITY;
      refDoc.GRADUAL_QUANTITY = row.GRADUAL_QUANTITY;
      refDoc.ACTUAL_QUANTITY = row.ACTUAL_QUANTITY;
      refDoc.REMAIN_QUANTITY = row.REMAIN_QUANTITY;
      refDoc.QUANTITY_UNIT_ID = row.QUANTITY_UNIT_ID;
      refDoc.ACTUAL_WEIGHT = row.ACTUAL_WEIGHT;
      refDoc.REMAIN_WEIGHT = row.REMAIN_WEIGHT;
      refDoc.WEIGHT_UNIT_ID = row.WEIGHT_UNIT_ID;
      refDoc.INVOICE_UNIT_PRICE = row.INVOICE_UNIT_PRICE;
      refDoc.TRANSPORT_TYPE_NAME = row.TRANSPORT_TYPE_NAME;
      refDoc.TRANSPORT_UNIT_PRICE = row.TRANSPORT_UNIT_PRICE;
      refDoc.TRANSPORT_TOTAL_PRICE = row.TRANSPORT_TOTAL_PRICE;
      refDoc.TRANSPORT_COUNTRY_CODE = row.TRANSPORT_COUNTRY_CODE;
      refDoc.TRANSPORT_COUNTRY_MORE = row.TRANSPORT_COUNTRY_MORE;
      refDoc.TRANSPORT_BY_BOAT = row.TRANSPORT_BY_BOAT;
      refDoc.TRANSPORT_BY_PLANE = row.TRANSPORT_BY_PLANE;
      refDoc.TRANSPORT_BY_TRUCK = row.TRANSPORT_BY_TRUCK;
      refDoc.DELIVERY_TIME_TEXT = row.DELIVERY_TIME_TEXT;
      refDoc.TRANSIT_TIME = row.TRANSIT_TIME;
      refDoc.OTHER_COMPLEMENTARY = row.OTHER_COMPLEMENTARY;
      refDoc.TAX_RATE = row.TAX_RATE;
      refDoc.UNIT_TAX = row.UNIT_TAX;
      refDoc.IS_PURE_INGREDIENT = row.IS_PURE_INGREDIENT;
      refDoc.INGREDIENT_DESCRIPTION = row.INGREDIENT_DESCRIPTION;
      refDoc.IS_PRODUCTION_IN_COUNTRY = row.IS_PRODUCTION_IN_COUNTRY;
      refDoc.DOMESTIC_UNIT_PRICE = row.DOMESTIC_UNIT_PRICE;
      refDoc.PRODUCTION_COMPANY = row.PRODUCTION_COMPANY;
      refDoc.PRODUCTION_TIME = row.PRODUCTION_TIME;
      refDoc.REASON = row.REASON;
      refDoc.HAS_PRODUCTION_PROCESS_DOC = row.HAS_PRODUCTION_PROCESS_DOC;
      refDoc.PRODUCTION_FUNCTION = row.PRODUCTION_FUNCTION;
      refDoc.HAS_PLANT_LAYOUT = row.HAS_PLANT_LAYOUT;
      refDoc.HAS_EXTERNAL_QA_DOC = row.HAS_EXTERNAL_QA_DOC;
      refDoc.EXTERNAL_QA_DOC_ISSUE_BY = row.EXTERNAL_QA_DOC_ISSUE_BY;
      refDoc.HAS_INTERNAL_QA_DOC = row.HAS_INTERNAL_QA_DOC;
      refDoc.INTERNAL_QA_DOC_ISSUE_BY = row.INTERNAL_QA_DOC_ISSUE_BY;
      refDoc.HAS_LINE_QA_DOC = row.HAS_LINE_QA_DOC;
      refDoc.LINE_QA_DOC_ISSUE_BY = row.LINE_QA_DOC_ISSUE_BY;
      refDoc.TESTING_QA_METHOD = row.TESTING_QA_METHOD;
      refDoc.TESTING_QA_DESCRIPTION = row.TESTING_QA_DESCRIPTION;
      refDoc.HAS_TIS = row.HAS_TIS;
      refDoc.HAS_TIS_SYMBOL = row.HAS_TIS_SYMBOL;
      refDoc.TIS_DESCRIPTION = row.TIS_DESCRIPTION;
      refDoc.PRODUCTION_EXCEPTION = row.PRODUCTION_EXCEPTION;
      refDoc.PRODUCTION_CAPACITY_PERCENT = row.PRODUCTION_CAPACITY_PERCENT;
      refDoc.HAS_EXPAND_PRODUCTION_CAPACITY = row.HAS_EXPAND_PRODUCTION_CAPACITY;
      refDoc.EXPAND_PRODUCTION_CAPACITY_DES = row.EXPAND_PRODUCTION_CAPACITY_DES;
      refDoc.PACKAGING_MATERIAL = row.PACKAGING_MATERIAL;
      refDoc.HAS_PACKAGING_TOOL = row.HAS_PACKAGING_TOOL;
      refDoc.PACKAGING_TOOL_DESCRIPTION = row.PACKAGING_TOOL_DESCRIPTION;
      refDoc.HAS_SAFETY_SYSTEM = row.HAS_SAFETY_SYSTEM;
      refDoc.SAFETY_SYSTEM_DESCRIPTION = row.SAFETY_SYSTEM_DESCRIPTION;
      refDoc.HAS_STANDARD_SYMBOL = row.HAS_STANDARD_SYMBOL;
      refDoc.STANDARD_SYMBOL_DESCRIPTION = row.STANDARD_SYMBOL_DESCRIPTION;
      refDoc.HAS_PACKAGING_CERTIFICATE = row.HAS_PACKAGING_CERTIFICATE;
      refDoc.PACKAGING_CERTIFICATE_ISSUE_BY = row.PACKAGING_CERTIFICATE_ISSUE_BY;
      refDoc.HAS_TESTING_PACKAGING_TOOL = row.HAS_TESTING_PACKAGING_TOOL;
      refDoc.TESTING_PACKAGING_TOOL_DESCRIP = row.TESTING_PACKAGING_TOOL_DESCRIP;
      refDoc.HAS_OTHER_PRODUCT = row.HAS_OTHER_PRODUCT;
      refDoc.OTHER_PRODUCT_DESCRIPTION = row.OTHER_PRODUCT_DESCRIPTION;
      refDoc.HAS_SECURITY_TRAINING = row.HAS_SECURITY_TRAINING;
      refDoc.SECURITY_TRAINING_DESCRIPTION = row.SECURITY_TRAINING_DESCRIPTION;
      refDoc.OTHER_EXPLAINATION = row.OTHER_EXPLAINATION;
      refDoc.HAS_CUSTOMER_KNOWLEDGE = row.HAS_CUSTOMER_KNOWLEDGE;
      refDoc.CUSTOMER_KNOWLEDGE_DESCRIPTION = row.CUSTOMER_KNOWLEDGE_DESCRIPTION;
      refDoc.CAPACITY_QUANTITY_AVG = row.CAPACITY_QUANTITY_AVG;
      refDoc.CAPACITY_QUANTITY_MAX = row.CAPACITY_QUANTITY_MAX;
      refDoc.CAPACITY_QUANTITY_MIN = row.CAPACITY_QUANTITY_MIN;
      refDoc.PO_NO = row.PO_NO;
      refDoc.PO_DATE = row.PO_DATE ? new Date(row.PO_DATE) : null;
      refDoc.DOC_END_USER_NAME = row.DOC_END_USER_NAME;
      refDoc.DOC_END_USER_DATE = row.DOC_END_USER_DATE ? new Date(row.DOC_END_USER_DATE) : null;
      refDoc.EXPORT_START_TIME = row.EXPORT_START_TIME;
      refDoc.EXPORT_END_TIME = row.EXPORT_END_TIME;
      refDoc.NOTE1 = row.NOTE1;
      refDoc.NOTE2 = row.NOTE2;
      refDoc.NOTE3 = row.NOTE3;
      refDoc.NOTE4 = row.NOTE4;
      refDoc.NOTE5 = row.NOTE5;
      refDoc.NOTE6 = row.NOTE6;
      refDoc.RESTRICTED_GOODS_AMOUNT_THB = row.RESTRICTED_GOODS_AMOUNT_THB;
      refDoc.RESTRICTED_GOODS_AMOUNT_FOR = row.RESTRICTED_GOODS_AMOUNT_FOR;
      refDoc.RGOODS_CURRENCY_CODE = row.RGOODS_CURRENCY_CODE;
      refDoc.INVOICE_AMOUNT_THB = row.INVOICE_AMOUNT_THB;
      refDoc.INVOICE_AMOUNT_FOR = row.INVOICE_AMOUNT_FOR;
      refDoc.INVOICE_CURRENCY_CODE = row.INVOICE_CURRENCY_CODE;
      refDoc.DEPARTURE_DATE = row.DEPARTURE_DATE ? new Date(row.DEPARTURE_DATE) : null;
      refDoc.ARRIVAL_DATE = row.ARRIVAL_DATE ? new Date(row.ARRIVAL_DATE) : null;
      refDoc.INVOICE_NO = row.INVOICE_NO;
      refDoc.INVOICE_DATE = row.INVOICE_DATE ? new Date(row.INVOICE_DATE) : null;
      refDoc.INVOICE_ITEM_NO = row.INVOICE_ITEM_NO;

      refDoc.refLicenseQTYUnitText = row.refLicenseQTYUnitText ? row.refLicenseQTYUnitText: '';
      refDoc.refLicenseWeightUnitText = row.refLicenseWeightUnitText ? row.refLicenseWeightUnitText : '';
      refDoc.refHasLicenseQTYUnitText = row.refHasLicenseQTYUnitText ? row.refHasLicenseQTYUnitText : '';
      refDoc.refHasLicenseWeightUnitText = row.refHasLicenseWeightUnitText ? row.refHasLicenseWeightUnitText : '';

      refDoc.refLicenseID = row.refLicenseID ? parseInt(row.refLicenseID) : 0;
      refDoc.refHasLicenseID = row.refHasLicenseID ? parseInt(row.refHasLicenseID) : 0;
      refDoc.refRequestID = row.refRequestID ? parseInt(row.refRequestID) : 0;

      refDoc.REF_EXPORT_LICENSE_FORM_ID = row.REF_EXPORT_LICENSE_FORM_ID;
      refDoc.REF_EXPORT_LICENSE_NO = row.REF_EXPORT_LICENSE_NO;
      refDoc.REF_EXPORT_LICENSE_ISSUE_DATE = row.REF_EXPORT_LICENSE_ISSUE_DATE;
      refDoc.REF_EXPORT_LICENSE_EXPIRY_DATE = row.REF_EXPORT_LICENSE_EXPIRY_DATE;
      refDoc.REF_EXPORT_LICENSE_QTY = row.REF_EXPORT_LICENSE_QTY;
      refDoc.REF_EXPORT_LICENSE_QTY_UNIT_ID = row.REF_EXPORT_LICENSE_QTY_UNIT_ID;
      refDoc.REF_EXPORT_LICENSE_WT = row.REF_EXPORT_LICENSE_WT;
      refDoc.REF_EXPORT_LICENSE_WT_UNIT_ID = row.REF_EXPORT_LICENSE_WT_UNIT_ID;

      this.currentDocument.ReferenceDocument = refDoc;

      console.log('apiData.ReferenceDocument : ', apiData.ReferenceDocument);

      if(apiData.ReferenceDocument.DetailsOfUsage && isArray(apiData.ReferenceDocument.DetailsOfUsage)){
        const usages: Array<UsageDetail> = apiData.ReferenceDocument.DetailsOfUsage;

        usages.forEach((row: any)=>{

          const usageItem: UsageDetail = new UsageDetail();

          usageItem.LICENSE_REQ_DTL_EXP_ID = row.LICENSE_REQ_DTL_EXP_ID;
          usageItem.ITEM_NO = row.ITEM_NO;
          usageItem.USE_DATE = new Date(row.USE_DATE);
          usageItem.USE_QUANTITY = row.USE_QUANTITY;
          usageItem.SALE_QUANTITY = row.SALE_QUANTITY;
          usageItem.REMAIN_QUANTITY = row.REMAIN_QUANTITY;
          usageItem.QUANTITY_UNIT_ID = row.QUANTITY_UNIT_ID;
          usageItem.IS_CURRENT_STOCK = row.IS_CURRENT_STOCK;

          refDoc.DetailsOfUsage.push(usageItem);

          // console.log('usages.forEach: ', row, usageItem);

        });

      }
      // if(apiData.ReferenceDocument.DetailsOfUsage)

    }

  }
  //-------------------------------------------------
  //-------------------------------------------------
  public get isImport(): boolean{
    // const docTypeNo = <number>this.currentRequestType;
    // return this._groupOfImport.includes(docTypeNo);
    return this._groupOfImport.includes(this.currentRequestType);
  }
  //-------------------------------------------------
  public get isExport(): boolean{
    return this._groupOfExport.includes(this.currentRequestType);
  }
  //-------------------------------------------------
  public get isRenew(): boolean{
    return this._groupOfRenew.includes(this.currentRequestType);
  }
  //-------------------------------------------------
  public get isSubstitute(): boolean{
    return this._groupOfSubstitute.includes(this.currentRequestType);
  }
  //-------------------------------------------------
  //-------------------------------------------------
}
