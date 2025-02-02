import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { BaseSection } from 'src/app/shared/base/base-section';
import { ApplicationContext } from 'src/app/application-context';
import { RequestDocumentService } from 'src/app/shared/services/request-document.service';
import { PopupSearchRefLicense } from '../popup-search-ref-license/popup-search-ref-license.component';
import { DialogResult } from 'src/app/shared/base/base-modal-dialog';
import { LicenseRefService } from 'src/app/shared/services/lookup/license-ref.service';
import { RequestDocumentType } from 'src/app/shared/enums/request-type.enum';
import { LicenseOperationMoveService } from 'src/app/shared/services/license-operation-move.service';
import { Country } from 'src/app/shared/models/lookup';
import { CountryService } from 'src/app/shared/services/lookup/country.service';
import { DateConvertorService } from 'src/app/shared/helpers/date-convertor.service';

import { LicenseOperationMonthly, CurrentDataOfLicense } from 'src/app/shared/models/license-operation-monthly';
import { LicenseForReference } from 'src/app/shared/models/documentForUIList';
import { ProductService } from 'src/app/shared/services/lookup/product.service';
import { ReferenceDocument, UsageDetail } from 'src/app/shared/models/request-document';

import { jQueryHelper } from './../../shared/helpers/jquery-helper';
import { ThrowStmt } from '@angular/compiler';
import { get } from 'jquery';

@Component({
  selector: 'cdss-section-document-reference',
  templateUrl: './section-document-reference.component.html',
  styleUrls: ['./section-document-reference.component.css']
})
export class SectionDocumentReferenceComponent extends BaseSection implements OnInit {

  private jh = new jQueryHelper();

  @ViewChild("popupLicense", { static: false }) popup_license: PopupSearchRefLicense;

  private currentOpMove:Array<LicenseOperationMonthly>;
  private currentDataOperationMove: CurrentDataOfLicense = null;
  // private currentDataOperationMove: CurrentDataOfLicense = new CurrentDataOfLicense();
  private _isInitDatePicker: boolean = false;
  // -----------------------------------------
  constructor(public app:ApplicationContext,
    public repo:RequestDocumentService, protected ref_license: LicenseRefService, protected ref_operationMove: LicenseOperationMoveService,
    private repoProduct: ProductService,
    private lookup_country: CountryService,
    private hp_date:DateConvertorService) {

    super(app, repo);

    this.title = "การอ้างอิงใบอนุญาต (ถ้ามี)";

    this.currentDataOperationMove = new CurrentDataOfLicense();

    this.currentOpMove = new Array();


    this.registerOnAfterViewInit(this.initDatePicker);

    setTimeout(() => {
      this.initWithReference();

    }, 50);
  }
  // -----------------------------------------
  ngOnInit() {

  }
  // -----------------------------------------
  ngOnDestroy() {
    this._isInitDatePicker = false;
    this.jh.toDestroy_DatePicker("cmdDocDate");
  }
  // -----------------------------------------
  public initDatePicker(withRaisePicker: boolean = false) {

    const cmdDocDate = document.getElementById("cmdDocDate");

    if(!cmdDocDate){
      // console.log('cmdDocDate not found.');
      this._isInitDatePicker = false;
      return;
    }

    if(this._isInitDatePicker){
      return;
    }

    this._isInitDatePicker = true;
    console.log('initDatePicker');
    this.jh.toDatePicker("cmdDocDate", 'current-doc-date', this.repo.currentDocument.ReferenceDocument.DOC_END_USER_DATE, (tag, data) => {
      this.OperationUsageCurrent.USE_DATE = data;
    });

    if(withRaisePicker){
      setTimeout(() => {
        this.jh.showDatePicker("cmdDocDate");
      }, 50);
    }
  }
  // -----------------------------------------
  private initWithReference(){

    let refDoc = this.repo.currentDocument.ReferenceDocument;

    // if(refDoc.refRequestID>0){
    //   const withOperationMonthly = (refDoc.DetailsOfUsage==null) || (refDoc.DetailsOfUsage.length<4);
    //   this.loadReferenceByRequestID(refDoc.refRequestID, false, withOperationMonthly);
    // }else if(refDoc.refHasLicenseID>0){
    //   const withOperationMonthly = (refDoc.DetailsOfUsage==null) || (refDoc.DetailsOfUsage.length<4);
    //   this.loadReferenceByHasLicenseID(refDoc.refHasLicenseID, false, withOperationMonthly);
    // }

    if(this.repo.currentDocument.ID==0 || (!refDoc.DetailsOfUsage || refDoc.DetailsOfUsage.length!=4)){
      console.log('load monthly', refDoc);
      if(refDoc.refHasLicenseID>0){
        const withOperationMonthly = true; //(refDoc.DetailsOfUsage==null) || (refDoc.DetailsOfUsage.length<4);
        console.log('this.loadReferenceByHasLicenseID: ', refDoc.refHasLicenseID, false, withOperationMonthly);
        this.loadReferenceByHasLicenseID(refDoc.refHasLicenseID, false, withOperationMonthly);
      }else if(refDoc.refLicenseID>0){
        const withOperationMonthly = true; // (refDoc.DetailsOfUsage==null) || (refDoc.DetailsOfUsage.length<4);
        console.log('this.loadReferenceByRequestID: ', refDoc.refRequestID, false, withOperationMonthly);
        this.loadReferenceByRequestID(refDoc.refRequestID, false, withOperationMonthly);
      }
    }else{
      //no refresh operationMove
    }

    this.fixedForRenew();

    this.initDatePicker();

  }
  // -----------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // -----------------------------------------
  public get HasProductReference():boolean{

    let result = (this.repo.currentDocument.Armament.PRODUCT_CODE != null) && (this.repo.currentDocument.Armament.PRODUCT_CODE.trim().length > 0);

    return result;
  }
  // -----------------------------------------
  public get HasLicenseReference():boolean{

    let result = (
      (
        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_NO != null &&
        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_NO.trim().length > 0
      ) ||
      (
        this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO != null &&
        this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO.trim().length > 0
      )
    );
    return result;
  }
  // -----------------------------------------
  public get HasReferenceToLicense():boolean{
    return (
      this.HasLicenseReference &&
      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_FORM_ID > 0 &&
      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_NO!=null &&
      this.repo.currentDocument.ReferenceDocument.REF_LICENSE_NO.length > 0
    )
  }
  public get HasReferenceToOwnerLicense():boolean{
    return (
      this.HasLicenseReference &&
      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_FORM_ID > 0 &&
      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO!=null &&
      this.repo.currentDocument.ReferenceDocument.REF_HAS_LICENSE_NO.length > 0
    )
  }
  public get hasOperationUsage():boolean{
    return this.HasLicenseReference && (this.repo.currentDocument.ReferenceDocument.DetailsOfUsage.length > 0);
  }
  // -----------------------------------------
  // -----------------------------------------
  public get ReferenceLicense(){
    return this.repo.currentDocument.ReferenceDocument;
  }
  // -----------------------------------------
  // -----------------------------------------
  public get IsReferenceToImportOrEnter(){
    return (
      this.HasLicenseReference &&
      (
        this.repo.currentRequestType == RequestDocumentType.ImportWithOwner ||
        this.repo.currentRequestType == RequestDocumentType.EnterWithOwner
      )
    );
  }
  // -----------------------------------------
  public get IsReferenceToProduction(){
    return (
      this.HasLicenseReference &&
      this.repo.currentRequestType == RequestDocumentType.ProductionWithOwner
    );
  }
  // -----------------------------------------
  public get IsReferenceToOnlyOwner(){
    return (
      this.HasLicenseReference &&
      (
        this.repo.currentRequestType == RequestDocumentType.Owner ||
        this.repo.currentRequestType == RequestDocumentType.Renewal_Owner
      )
    );
  }
  // -----------------------------------------
  public get IsShowReferenceButton():boolean{
    return true;
    //fixed https://app.clickup.com/t/860qkedj6
    // return (
    //   this.repo.currentRequestType == RequestDocumentType.Owner
    // );
  }
  // -----------------------------------------
  public selectLicenseReference():void{

    //this.popup_license.openForSearchOwnerLicense((result:DialogResult)=>{
    this.popup_license.openForSearchLicensefocusFromRequestType(this.repo.currentRequestType ,(result:DialogResult)=>{
      console.log('result from popup: ', result.data);
      if(result.data!=null){
        this.loadReferenceByHasLicenseID(result.data.id, true, true);
      }

    });
  }
  // -----------------------------------------
  private _unitName:string = '';

  public loadReferenceByHasLicenseID(reference_license_id, withSetProduct: boolean = true, withSet_OperationMonthly: boolean = false){
    // console.log('loadReferenceByHasLicenseID: ', reference_license_id);
    this.ref_license.loadReferenceByLicenseID(reference_license_id, (result:LicenseForReference)=>{
      // console.log('LicenseForReference : ', result);
      this.setDataReferenceLicense(result, withSetProduct, withSet_OperationMonthly);

    }, (error_message)=>{
      console.error('>>Error loadReferenceByRequestID : ', error_message);
    });
  }
  // -----------------------------------------
  public loadReferenceByRequestID(reference_request_id, withSetProduct: boolean = true, withSet_OperationMonthly: boolean = false){
    // console.log('loadReferenceByRequestID: ', reference_request_id);
    this.ref_license.loadReferenceByRequestID(reference_request_id, (result:LicenseForReference)=>{
      // console.log('LicenseForReference : ', result);
      this.setDataReferenceLicense(result, withSetProduct, withSet_OperationMonthly);

    }, (error_message)=>{
      console.error('>Error loadReferenceByRequestID : ', error_message);
    });
  }
  // -----------------------------------------
  private setDataReferenceLicense(result:LicenseForReference, withSetProduct: boolean = true, withSet_OperationMonthly: boolean = false){
    let product = this.repoProduct.getProductDetail(result.has_license.product_code);

    const requestObjective = result.has_license ? result.has_license.Objective : result.license.Objective;

    if(withSetProduct){
      this.repo.SetProductToArmament(product, requestObjective);
    }
    // console.log('loadReference: ', reference_request_id);
    this.repo.SetReferenceLicense(result, withSetProduct, withSet_OperationMonthly);

    this.tempFullRemain = this.repo.currentDocument.ReferenceDocument.REMAIN_QUANTITY;

    this.currentDataOperationMove = result.operation_move_of_has_license;
    this._unitName = result.operation_move_of_has_license.unit_name;


    this.fixedForRenew();

    this.fixedForChange_01();
    this.fixedForSecondRenew_SetRemainIsZero();

    this.initDatePicker();
  }
  // -----------------------------------------
  // ---- https://app.clickup.com/t/860qke7dj -----
  private fixedForChange_01(){
// ------------- https://app.clickup.com/t/860qke7dj --------------------------
    let getSum = 0;
    this.OperationUsageLastest.forEach((item: UsageDetail)=>{ getSum+=item.USE_QUANTITY; });

    console.log('get sum: ', getSum);
    console.log(this.OperationUsageCurrent, this.OperationUsageLastest);

    if(getSum<1){
      this.OperationUsageCurrent.REMAIN_QUANTITY = 0;
      // this.OperationUsageCurrent.USE_DATE = null;
      this.OperationUsageCurrent.USE_DATE = new Date();
    }
// ----------------------------------------------------------------------------
  }
  // -----------------------------------------
  public get IsLoadingReferenceData():boolean{
    return this.ref_license.isLoading;
  }
  // -----------------------------------------
  public clearLicenseReference(){
    this.repo.ClearReferenceLicense();
    // this.repo.currentDocument.LogicOfDocument.requestType = RequestDocumentType.Owner;
  }
  // -----------------------------------------
  public get ReferenceFromCountryCaption():string{
    let result = "";

    switch(this.repo.currentRequestType){
      case RequestDocumentType.ImportWithOwner : result = "นำเข้า"; break;
      case RequestDocumentType.EnterWithOwner : result = "สั่งซื้อ"; break;
    }

    return result;
  }
  // -----------------------------------------
  public get CountryList():Array<Country>{
    return this.lookup_country.Datasource;
  }
  // -----------------------------------------
  public setReferenceLicense_TransformBy(byType, elID) {
    let isCheck:any = document.getElementById(elID);
    let value = isCheck.checked ? 1 : 0;
  }
  // -----------------------------------------
  public get RefDoc(): ReferenceDocument{
    return this.repo.currentDocument.ReferenceDocument;
  }
  public get RefLicense_IsCheck_ByBoat(): boolean {
    return true;
    //return this.RefDoc.TRANSPORT_BY_PLANE==1;
  }
  // -----------------------------------------
  public get RefLicense_IsCheck_ByPlane(): boolean {
    return true;
    //return this.RefDoc.TRANSPORT_BY_PLANE==1;
  }
  // -----------------------------------------
  public get RefLicense_IsCheck_ByTruck(): boolean {
    return true;
    //return this.RefDoc.TRANSPORT_BY_PLANE==1;
  }
  // -----------------------------------------
  //public GetMonthCaption(item: LicenseOperationMonthly){
  public GetMonthCaption(item: UsageDetail){
    // console.log('GetMonthCaption: ', item);
    if(item.USE_DATE==null || typeof item.USE_DATE.getMonth !== 'function'){
      item.USE_DATE = new Date(item.USE_DATE);
    }
    // return this.hp_date.ToMonthNameAndYearWithParameter(item.month_no, item.year_no);
    return this.hp_date.ToMonthNameAndYearWithParameter(item.USE_DATE.getMonth()+1, item.USE_DATE.getFullYear());
  }
  // -----------------------------------------
  // public get CurrentDataOperationMove(): CurrentDataOfLicense{
  //   return this.currentDataOperationMove;
  // }
  // public get OperationMoveLastest():Array<LicenseOperationMonthly>{
  //   return this.currentDataOperationMove.operation_move.filter((item: LicenseOperationMonthly)=>{
  //     return (item.item_no != 4);
  //   });
  // }
  public get OperationUsageLastest():Array<UsageDetail>{

    // console.log('DetailsOfUsage: ', this.repo.currentDocument.ReferenceDocument.DetailsOfUsage);

    return this.repo.currentDocument.ReferenceDocument.DetailsOfUsage.filter((item: UsageDetail)=>{
      return (item.ITEM_NO != 4);
    }).sort((a: UsageDetail, b: UsageDetail)=>{
      if(a.ITEM_NO < b.ITEM_NO){
        return -1
      }else if(a.ITEM_NO > b.ITEM_NO){
        return 1;
      }else{
        return 0;
      }
    });
  }
  // -----------------------------------------
  // public get OperationMoveCurrent():LicenseOperationMonthly{
  //   return this.currentDataOperationMove.operation_move.find((item: LicenseOperationMonthly)=>{
  //     return (item.item_no == 4);
  // });
  // -----------------------------------------
  public get OperationUsageCurrent():UsageDetail{

    const result =this.repo.currentDocument.ReferenceDocument.DetailsOfUsage.find((item: UsageDetail)=>{
      return (item.ITEM_NO == 4);
    });

    // console.log('OperationUsageCurrent: ', result);

    return result;

    // return this.repo.currentDocument.ReferenceDocument.DetailsOfUsage.find((item: UsageDetail)=>{
    //   return (item.ITEM_NO == 4);
    // });
    // -----------------------------------------
  }
  // -----------------------------------------
  public get unitName():string{
    return this._unitName;
  }
  // -----------------------------------------
  public get requestActionTypeName():string{
    return 'ทำ';
  }
  // -----------------------------------------
  public tempFullRemain: number = 0;

  public autoCalRemain(){
    // console.log('autoCalRemain');
    if(this.IsRenewal){
      // this.fixedForRenew();
      this.fixedForSecondRenew_SetRemainIsZero();
      return;
    }
    setTimeout(()=>{
      console.log('autoCalRemain');
      this.callRemain();
      // move to callRemain
      // this.repo.currentDocument.ReferenceDocument.REMAIN_QUANTITY = (this.tempFullRemain - this.repo.currentDocument.ReferenceDocument.ACTUAL_QUANTITY);
    }, 50 );

  }
  // -----------------------------------------
  public get IsRenewal():boolean{
    // return (this.requestDocumentType >= RequestDocumentType.Renewal) && (this.requestDocumentType <= RequestDocumentType.Renewal_CrossBorderWithOwner);
    let result = (
      this.repo.currentRequestType >= RequestDocumentType.Renewal) &&
      (this.repo.currentRequestType <= RequestDocumentType.Renewal_CrossBorder
    );

    return result;
  }
  // -----------------------------------------
  private fixedBugMappingData(){

    // console.log('ReferenceDocument: ', this.repo.currentDocument.ReferenceDocument);

    // if(this.repo.currentDocument.ReferenceDocument.DOC_END_USER_DATE==undefined){
    //   this.repo.currentDocument.ReferenceDocument.DOC_END_USER_DATE = null;
    // }

    // console.log('ReferenceDocument.DOC_END_USER_DATE: ', this.repo.currentDocument.ReferenceDocument.DOC_END_USER_DATE);

  }
  // -----------------------------------------
  // change for https://app.clickup.com/t/860q5adr2
  private fixedForRenew(){
    if(this.IsRenewal){
      this.RefDoc.REMAIN_QUANTITY = 0;
    }
  }
  // -----------------------------------------
  //https://app.clickup.com/t/860rbwmx6
  private fixedForSecondRenew_SetRemainIsZero(){
    // if(( this.RefDoc.refHasLicenseID == null) || (this.RefDoc.refHasLicenseID == 0)){
    if(( this.RefDoc.renewCount>1)){
      this.RefDoc.REMAIN_QUANTITY = 0;
    }else{
      this.callRemain();
    }
  }
  // -----------------------------------------
  private callRemain(){

    this.repo.currentDocument.ReferenceDocument.REMAIN_QUANTITY = (this.tempFullRemain - this.repo.currentDocument.ReferenceDocument.ACTUAL_QUANTITY);

    console.log("tempFullRemain: ", this.tempFullRemain);
    console.log("ReferenceDocument: ", this.repo.currentDocument.ReferenceDocument);


  }
  // -----------------------------------------
  public get isShowCancelReferenceButton(): boolean{

    const result = ((this.HasReferenceToLicense || this.HasReferenceToOwnerLicense) || !this.IsRenewal);

    // console.log("isShowCancelReferenceButton : ", this.HasReferenceToLicense, this.HasReferenceToOwnerLicense, this.IsRenewal, result);

    return (
      (this.HasReferenceToLicense || this.HasReferenceToOwnerLicense) ||
      !this.IsRenewal
    );
  }
}
