import { Injectable } from '@angular/core';
import { ApplicationContext } from '../../../application-context';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../base/base.service';
// import { LicenseDocumentForReference } from '../../models/documentForUIList';
import { LicenseForReference, License } from '../../models/documentForUIList';


import { ServerResult } from '../../models/result';
import { LicenseOperationMonthly } from '../../models/license-operation-monthly';
import { LicenseOperationMoveService } from '../license-operation-move.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseRefService extends BaseService<Array<LicenseForReference>> {

  constructor(protected app:ApplicationContext, protected http:HttpClient, private repoOperationMove:LicenseOperationMoveService) {
    super(app, http, 'license/GetReference');

    this.data = new Array();
  }
  // ------------------------------------------------
  protected loadData(p: any = null) {
    //public loadData(request_id:number) {

    let params = this.buildAPIParam_Document(p);
    this.is_loading = true;
    this.post(params,
      result => {
        // console.log('load ref license : ', result);
        this.is_loading = false;
      },
      error => {
        console.error('load ref license : ', error);
        this.is_loading = false;
      }
    );


  }
  // ------------------------------------------------
  public loadReferenceByRequestID(id:number, callback_ok:Function=null, callback_error:Function=null){
    this.loadReference(id, true, callback_ok, callback_error);
  }
  // ------------------------------------------------
  public loadReferenceByLicenseID(id:number, callback_ok:Function=null, callback_error:Function=null){
    this.loadReference(id, false, callback_ok, callback_error);
  }
  // ------------------------------------------------
  protected loadReference(doc_id:number, urlByRequestID:boolean, callback_ok:Function=null, callback_error:Function=null){
    let params = this.buildAPIParam_Document(doc_id);
    let url = "";

    if(urlByRequestID){
      url = this.buildAPIURL("license/GetReferenceLicenseFromRequestID");
    }else{
      url = this.buildAPIURL("license/GetReferenceLicenseFromLicenseID");
    }

    console.log('loadReference from : ', url, params);

    this.is_loading = true;

    this.app.ShowWaitingDialog();

    this.postToURL(url, params,
      (result:ServerResult)=>{
        console.clear();
        console.log('----------------------------------');
        console.log('loadReference: ', result);
        console.log('reference_license_count: ', result.data.reference_license_count);
        console.log('----------------------------------');
        this.is_loading = false;

        this.app.CloseWaitingDialog();
        if(callback_ok!=null) callback_ok(result.data);

      }, (error:ServerResult)=>{
        console.error('loadReference error :', error);
        this.is_loading = false;

        this.app.CloseWaitingDialogWithError(error);
        if(callback_error!=null) callback_error(error.message);

      });

  }
  // ------------------------------------------------
  // protected loadOperationMove(license_id:number){

  //   this.repoOperationMove.getLast3Month(license_id, (result)=>{

  //   }, (error)=>{

  //   });
  // }

}
