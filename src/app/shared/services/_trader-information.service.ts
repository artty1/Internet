import { Injectable, isDevMode } from '@angular/core';
import { BaseService } from '../base/base.service';

import { HttpClient } from '@angular/common/http';
import { ServerResult } from '../models/result';
import { Trader } from '../models/common';
import { ApplicationContext } from '../../application-context';
import { TraderDocumentFromELicensing } from '../models/trader-document';
import { ELicensingService } from './elicensing.service';


@Injectable({
  providedIn: 'root'
})
export class TraderInformationService extends BaseService<Trader> {

  private is_loading_success: boolean = false;
  private is_loading_error: boolean = false;
  private message_result: string = "";

  public traderDocumentAttachments: Array<TraderDocumentFromELicensing> = null;
  //-----------------------------------------------
  constructor(
    protected app: ApplicationContext,
    protected http: HttpClient,
    protected eLicensingService: ELicensingService
    ) {
    super(app, http, 'lookup/TraderInformation');


    this.traderDocumentAttachments = new Array();

  }
  //-----------------------------------------------
  public loadTrader(trader_id: number, callback_success: Function, callback_error: Function) {

    let params = this.buildAPIParam_UserReference();

    this.post(params,
      (result: ServerResult) => {
        this.data = result.data;
        this.message_result = "load trader information success";
        this.is_loading_success = true;
        callback_success(this.data);

      },
      (err: ServerResult) => {
        console.log('Error : ', err);

        this.is_loading_error = true;
        this.message_result = err.listAllMessage;
        callback_error(this.message_result);

      });
  }
  //---------------------------------------------
  public get isLoadingSuccess(): boolean {
    return this.is_loading_success;
  }
  //---------------------------------------------
  public get isLoadingError(): boolean {
    return this.is_loading_error;
  }
  //---------------------------------------------
  public get message(): string {
    return this.message_result;
  }
  //---------------------------------------------
  public get profile() {
    return this.profile;
  }
  //---------------------------------------------
  public loadDocumentAttactmentOfTrader(callback: Function, forceRefresh: boolean = false){

    if(forceRefresh || this.traderDocumentAttachments.length==0){
      this.eLicensingService
      .loadDocumentAttactment()
      .then((result: ServerResult)=>{

        this.traderDocumentAttachments = <Array<TraderDocumentFromELicensing>> result.data;

        const docResult = <Array<TraderDocumentFromELicensing>> result.data;
        const hasData:boolean = docResult.length>0;

        this.app.CloseWaitingDialog();

        if(!hasData){
          this.traderDocumentAttachments = new Array();
          this.app.ShowWaitingDialog("data not found.");

          callback(null);
        }else{
          this.traderDocumentAttachments = docResult;
          callback(null);
        }

      })
      .catch((err: ServerResult)=>{
        console.log(err);
        this.app.CloseWaitingDialog();

        callback(err);
      });
    }else{
      callback(null);
    }


  }
}
