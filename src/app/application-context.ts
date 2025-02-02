import { Injectable, isDevMode } from '@angular/core';
import {  } from '@angular/common';
import { Router, Route } from '@angular/router';

import { PermissionMode, RequestDocumentType } from './shared/enums/request-type.enum';

import { Trader, Person, Address } from './shared/models/common';

import routeDef from './shared/data/route-definition';
//import { CurrentUser } from './shared/models/current-user';

import { FilterCommonData } from './shared/helpers/filter-common-data';
import { Configuration } from './app-config';

import { CookieHelper } from './shared/helpers/cookie-helper';
import { Profile } from './shared/models/profile';
import { WaitingDialog } from './components/waiting-dialog/waiting-dialog.component';
import { ServerResult } from './shared/models/result';
import { Message } from './shared/models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MessageDialog } from './components/message-dialog/message-dialog.component';
import { TraderDocumentFromELicensing } from './shared/models/trader-document';
import { ErrorDialog } from './components/error-dialog/error-dialog.component';

declare var moment: any;
declare var window: any;

//declare global {
//  interface Window { DID_TOKEN: any; }
//}

@Injectable({
  providedIn: 'root'
})
export class ApplicationContext {

  private waitingDialog:WaitingDialog;
  private errorDialog:ErrorDialog;

  private message:Message = new Message();



  private filtering = new FilterCommonData();
  private config = new Configuration();
  private cookie = new CookieHelper();

  private is_admin: boolean = false;

  public traderInformation: Trader;
  // public currentUser: CurrentUser;
  public currentUser: Profile;

  public token: string = '';

  public requestUpdateDraftList: boolean = false;
  public requestUpdateSubmitList: boolean = false;
  public requestUpdateLicenseList: boolean = false;

  public lastUpdateID: number = 0;

  public eLicensingToken: string = '';

  public isShowFirstPageWarning: boolean = false;
  //-------------------------------------------
  constructor(private router: Router, http: HttpClient) {

    this.readConfig(http, (isLoadConfigOK: boolean)=>{
      this.initFunction();
      this.router.navigate([routeDef.pageInit]);
    });

  }
  //-------------------------------------------
  private initFunction() {

    // -------------------------------------
    let config_from_html = window.app_config;
    let config_script_tag = document.getElementById("script-ng-config");

    if(config_from_html!=undefined){
      this.config.SetConfig(config_from_html);
      // console.log('init config : ', this.config);
      // console.log("init config : ", config_from_html);
      // console.log('init config : ', this.config);
      // console.log('-------------------------');
    }
    if(config_script_tag!=undefined){
      config_script_tag.remove();
    }
    // -------------------------------------
    let token = (this.cookie.get(this.config.cookie_token_name));
    this.token = '';

    if (token != null) {
      this.token = token;
    }
    // -----------------------------------------------
    if (window.goOut == null) {

      var TOKEN = this.token;
      var DIDJUMPURL = this.config.did_url;
      // console.log('generate goout()');
      window.goOut = function (url) {
        let gotoURL = DIDJUMPURL + '?module=' + url + '&token=' + TOKEN;

        document.location.href = gotoURL;
      }

    }

  }
  //-------------------------------------------
  private readConfig(http: HttpClient, callback: Function) {
    http.get('assets/config.json').toPromise<any>()
    .then((config_from_html)=>{
      this.config.SetConfig(config_from_html);
      // console.log("read config : ", config_from_html);
      // console.log('read config : ', this.config);
      // console.log('-------------------------');
      callback(true);
    })
    .catch(err=>{
      console.log("error loading config file :", err);
      callback(false);
    })
  }
  //-------------------------------------------
  public get Message():Message{
    return this.message;
  }
  //-------------------------------------------
  public setValidateControl(id: string, isValid: boolean) {
    let validClass = "is-invalid";
    let el = document.getElementById(id);

    if (isValid) {
      if (el.classList.contains(validClass)) el.classList.remove(validClass);
    } else {
      //console.log('id : ', id);
      if (!el.classList.contains(validClass)) el.classList.add(validClass);
    }
  }
  //-------------------------------------------
  public scrollToElement(elID: string) {
    var el = document.getElementById(elID);
    el.scrollIntoView();
  }
  //-------------------------------------------
  public scrollToTop() {
    var el = document.getElementById("div-did");
    el.scrollIntoView();
  }
  //-------------------------------------------
  public get IsAdmin(): boolean {
    return this.is_admin;
  }
  public set IsAdmin(value: boolean) {
    this.is_admin = value;
  }
  //-------------------------------------------
  public IsPermissionForRequest(reqType: RequestDocumentType, mode: PermissionMode): boolean {
    // fixed in first phase !!!!
    return true;
  }
  //-------------------------------------------
  private initialPage() {

    document.getElementById("div-footer_left").innerHTML = this.getAppDetailForFooter;
    document.getElementById("div-footer_right").innerHTML = this.getUserDetailForFooter;

    let menuAdmin = document.getElementById("menu-admin");

    if (this.is_admin == true) {
      menuAdmin.style.display = "block";
    } else {
      menuAdmin.parentElement.removeChild(menuAdmin);
    }

  }
  //-------------------------------------------
  public get Configuration(): Configuration {
    return this.config;
  }
  //-------------------------------------------
  public get isTraderExpire(): boolean {
    return this.traderInformation.isExpire;
  }
  //-------------------------------------------
  public get isLogin(): boolean {

    if (this.currentUser == null) {
      return false;
    }

    return (this.currentUser.trader_id > 0) && (this.currentUser.user_name.trim().length > 0);
  }
  //-------------------------------------------
  public get isDevMode(): boolean {
    return isDevMode();
  }
  //-------------------------------------------
  public get Person_Committee(): Array<Person> {
    return this.filtering.listPerson_Committee(this.traderInformation.people);
  }
  //-------------------------------------------
  public get Person_Attorney(): Array<Person> {
    return this.filtering.listPerson_Attorney(this.traderInformation.people);
  }
  //-------------------------------------------
  public get Person_Trader(): Array<Person> {
    return this.filtering.listPerson_Trader(this.traderInformation.people);
  }
  //-------------------------------------------
  public get Person_Other(): Array<Person> {
    return this.filtering.listPerson_Trader(this.traderInformation.people);
  }
  //-------------------------------------------
  public get getUserDetailForFooter() {
    return this.currentUser.trader_name;
  }
  //-------------------------------------------
  public get getAppDetailForFooter() {
    // return this.config.application_name + " [" + this.config.version + "]";
    return this.config.application_name + ", version: " + this.config.version;
  }
  //-------------------------------------------
  public gotoLogin() {
    // console.log('gotoLogin : ', this.config.did_url);

    // setTimeout(() => {
    //   document.location.replace(this.config.did_url);
    // }, 50);

  }
  //-------------------------------------------
  public gotoHome(withInitial: boolean = false) {
    // console.log('gotoHome');
    this.router.navigate(['']);
    if (withInitial) this.initialPage();
  }
  //-------------------------------------------
  public gotoPage(url: string, withClearHistory: boolean = false) {

    if (withClearHistory) {
      this.router.navigate([url], { replaceUrl: true });
    } else {
      this.router.navigate([url]);
    }

  }
  //-------------------------------------------
  public get getCurrentLanguage(): string {
    return this.config.lang;
  }
  //-------------------------------------------
  public gotoRenewPage() {

  }
  //-------------------------------------------
  public gotoSubmit() {
    this.router.navigate([routeDef.pageSubmit]);
  }
  //-------------------------------------------
  public gotoDraftDashboard() {
    this.router.navigate([routeDef.pageDraft]);
  }
  //-------------------------------------------
  public gotoDraft(draft_id: number) {
    let url = routeDef.buildPathWithRoot(routeDef.pageDraft, draft_id);
    //console.log(url);
    this.router.navigate([url]);
  }
  //-------------------------------------------
  public gotoNewDraft(reqType: RequestDocumentType) {
    let url = '';
    //console.log('gotoNewDraft : ', reqType);
    //----------------------------------
    switch (reqType) {
      case RequestDocumentType.CrossBorder:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_CrossBorder);
        break;
      case RequestDocumentType.EnterWithOwner:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Enter);
        break;
      case RequestDocumentType.Export:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Export);
        break;
      case RequestDocumentType.ExportSpecial:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_ExportSpecial);
        break;
      case RequestDocumentType.ImportWithOwner:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Import);
        break;
      case RequestDocumentType.Owner:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Owning);
        break;
      case RequestDocumentType.ProductionWithOwner:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Production);
        break;
      //case RequestDocumentType.Renewal:
      //  url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Renewal);
      //  break;
      case RequestDocumentType.SendSample:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_SendSample);
        break;
      case RequestDocumentType.Substitute:
        url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Substiture);
        break;
    }
    //----------------------------------
    if (reqType > 10000 && reqType < 20000) {
      url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Renewal);
    }


    //console.log(url);
    this.router.navigate([url]);
  }
  //-------------------------------------------
  public gotoRenewPageWithReferenceToLicense(license_id: number) {
    //referToLicense, referToRequest, referToReject
    let url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Renewal, 'license', license_id);
    this.router.navigate([url]);
  }
  //-------------------------------------------
  public gotoRenewPageWithReferenceToRequest(request_id: number) {
    let url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Renewal, 'request', request_id);
    this.router.navigate([url]);
  }
  //-------------------------------------------
  public gotoSubstituePage(license_id: number) {
    let url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Substiture, license_id);
    this.router.navigate([url]);
  }
  //-------------------------------------------
  public gotoDraftPageWithReferenceToReject(reject_id: number) {
    let url = routeDef.buildPathWithRoot(routeDef.pageNew, routeDef.pageNew_Renewal, 'reject', reject_id);
    this.router.navigate([url]);
  }
  //----------------------------------------------
  public buildDownloadPath(...pathString: Array<string>): string {

    let result = this.buildAPIURL("Download")
    // let result = this.config.download_url;

    for (let item of pathString) {
      result += '/' + item;
    }
    // console.log('buildDownloadPath : ', result);
    return result;
  }
  //-------------------------------------------
  //-------------------------------------------
  public SetMainDialog(waitingDialog:WaitingDialog, errorDialog:ErrorDialog){
    this.waitingDialog = waitingDialog;
    this.errorDialog = errorDialog;
  }
  // public SetMainDialog(waitingDialog:WaitingDialog){
  //   this.waitingDialog = waitingDialog;
  // }
  //-------------------------------------------
  private waitingMessage:string = "";
  private _isShowLoadingImage: boolean = true;
  public get isShowLoadingImage():boolean{
    return this._isShowLoadingImage;
  }
  public get WaitingMessage():string{
    return this.waitingMessage;
  }
  public ShowWaitingDialog(message:string="", header:string="", withLoadingImage:boolean = true){
    // console.log('waitingDialog : ', this.waitingDialog);
    this.waitingMessage = message;
    this.waitingDialog.title = header;
    this._isShowLoadingImage = withLoadingImage;
    this.waitingDialog.openDialog();
  }
  //-------------------------------------------
  public CloseWaitingDialog(){
    // console.log('CloseWaitingDialog');
    this.waitingMessage = "";
    this.waitingDialog.title = "";
    // this._isShowLoadingImage = true;
    this.waitingDialog.closeDialog();

    setTimeout(() => {
      // console.log('clear dialog');
      let backdrop = document.querySelector(".modal-backdrop.fade");

      if(backdrop){
        // console.log('backdrop : ', backdrop);
        backdrop.remove();
      }


    }, 50);
  }
  //-------------------------------------------
  public CloseWaitingDialogWithError(err:ServerResult){
    this.CloseWaitingDialog();
  }
  //-------------------------------------------
  //-------------------------------------------
  //-------------------------------------------
  public get DefaultPageSize():number{
    return 10;
  }
  //-------------------------------------------
  public get httpOptionsOfElicensing():any{

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.eLicensingToken
    });

    return { headers, observe: 'response' };
  }
  //-------------------------------------------
  public get httpOptionsFromBlobOfElicensing():any{

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.eLicensingToken
    });

    return { headers, responseType: 'blob' };
  }
  //-------------------------------------------
  public buildAPIURL(...urlSections: Array<string>): string {

    let result = this.config.api_url;
    result += urlSections.map(item => item.trim()).filter(item => item.length > 0).join("/");
    return result;
  }
  //-------------------------------------------
  public buildELicensingAPIURL(...urlSections: Array<string>): string {

    let result = this.config.elicensing_api_url;
    result += urlSections.map(item => item.trim()).filter(item => item.length > 0).join("/");
    return result;
  }
  //-------------------------------------------
  public get upload_field_name():string{
    return 'fileName';
  }
  //-------------------------------------------
  public get upload_file_size():number{
    // return 20000000;
    return 3072000;
  }
  //-------------------------------------------
  public get upload_url():string{
    return this.buildELicensingAPIURL('upload');
  }
  //-------------------------------------------
  public setTraderDocumentInfo(doc: Array<TraderDocumentFromELicensing>){

    let fnToDateInt = (d: Date): number=>{
      return parseInt(d.getFullYear().toString()+d.getMonth().toString().padStart(2,"0")+d.getDate().toString().padStart(2, "0"));
    }

    let currentDate = fnToDateInt(new Date());

    const docExpire = doc.filter((d: TraderDocumentFromELicensing)=>{

      if(d.expiry_date==null){
        return false;
      }else{
        const expInt = fnToDateInt(d.expiry_date);
        // console.log(currentDate, expInt);

        return (currentDate>expInt);
      }

    });

    if(docExpire.length>0){
      let fnToDateString = (d: Date)=>{
        return d.getDate().toString().padStart(2, "0")+"/"+(d.getMonth()+1).toString().padStart(2,"0")+"/"+d.getFullYear().toString();
      }
      const errorList = docExpire.map((doc: TraderDocumentFromELicensing)=>{

        const message = "+ "+doc.document_name+"หมดอายุ [วันที่หมดอายุ "+ fnToDateString(doc.expiry_date)+"]";
        return message;
      });

      errorList.push("");
      errorList.push("กรุณาติดต่อเจ้าหน้าที่");

      this.errorDialog.openDialogWithMessage("ไม่สามารถใช้งานในส่วนของคำขอใบอนุญาตได้ เนื่องจาก", errorList);
    }

  }
  //-------------------------------------------
}
