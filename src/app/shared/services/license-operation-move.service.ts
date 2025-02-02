import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ApplicationContext } from 'src/app/application-context';
import { HttpClient } from '@angular/common/http';
import { LicenseOperationMonthly } from '../models/license-operation-monthly';
import { ServerResult } from '../models/result';

@Injectable({
  providedIn: 'root'
})

export class LicenseOperationMoveService extends BaseService<LicenseOperationMonthly> {

  constructor(protected app:ApplicationContext, protected http: HttpClient) { 
    super(app, http, 'license/GetOperationOfLicense');    
  }
  // -------------------------------------------------------------
  public getLast3Month(license_id:number, callbackOK:Function, callbackError:Function){

    let params = this.buildAPIParam_Document(license_id);

    this.app.ShowWaitingDialog("Load License Operation...");

    this.post(params, (result:ServerResult)=>{
      this.app.CloseWaitingDialog();
      callbackOK(result);
    }, (error:ServerResult)=>{
      this.app.CloseWaitingDialogWithError(error);
      callbackOK(error);
    });

  }
  // -------------------------------------------------------------
}
