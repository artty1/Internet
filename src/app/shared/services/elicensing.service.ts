import { Injectable } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ServerResult } from '../models/result';

import { map } from 'rxjs/operators';
import { TraderDocumentAttachment, TraderDocumentFromELicensing } from '../models/trader-document';

@Injectable({
  providedIn: 'root'
})

export class ELicensingService {

  constructor(
    protected app: ApplicationContext,
    protected http: HttpClient
  ) {

  }

  //-----------------------------------------------------------
  public viewDocument(token:string, defaultFileName:string="report.pdf"): Promise<ServerResult>{

    const url = this.app.buildELicensingAPIURL('download', token);
    const options = this.app.httpOptionsFromBlobOfElicensing;

    return new Promise<ServerResult>((resolve, reject)=>{

      this.http.get(url, options).subscribe((resp)=>{
        const blob = new Blob([resp]);

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.target = "_blank";
        link.download = defaultFileName;
        link.click();

        const result = new ServerResult();
        result.has_error = false;
        result.data = blob;

        resolve(result);

      }, (error)=>{
        // console.log('download: ', error);

        const result = new ServerResult();
        result.has_error = true;
        result.data = error;
        result.message.push(error.statusText);
        result.message.push(error.message);

        this.app.ShowWaitingDialog(result.listAllMessage);

        reject(result);
      });

    });

  }
  //-----------------------------------------------------------
  //-----------------------------------------------------------
  public loadDocumentAttactment(): Promise<ServerResult>{
    const traderId = "attachment?trader_id="+this.app.currentUser.trader_id.toString();
    const url = this.app.buildELicensingAPIURL('trader', 'einternet', traderId);
    const options = this.app.httpOptionsOfElicensing;

    this.app.ShowWaitingDialog();

    return new Promise<ServerResult>((resolve, reject)=>{

      this.http.get(url, options)
      .pipe(
        map((resp:any)=>{
          console.log('attachment : ', resp);
          const result = new ServerResult();

          result.data = resp.body.data;
          result.message = resp.body.message;
          result.has_error = resp.body.is_success==true ? false : true;

          return result;
        })
      )
      .subscribe((resp:ServerResult)=>{
        resp.data = this.mappingModelList(resp.data);

        this.app.CloseWaitingDialog();
        resolve(resp);

      }, (err:HttpErrorResponse)=>{

        const errorResult = new ServerResult();

        errorResult.data = err.error;
        errorResult.has_error = true;
        errorResult.result_code = err.status;

        errorResult.message.push(err.status+': '+err.statusText);
        errorResult.message.push(err.message);

        this.app.ShowWaitingDialog(errorResult.listAllMessage);

        reject(errorResult);

      }, );

    });

  }
  //-----------------------------------------------------------
  private mappingModelList(apiServiceResultData: any): Array<TraderDocumentFromELicensing>{

    const apiData = [];

    if(Array.isArray(apiServiceResultData)){
      apiData.push(...apiServiceResultData);
    }else{
      apiData.push(apiServiceResultData);
    }

    return apiData.map((item:any)=>{
      return this.mappingModel(item);
    });

  }
  //-----------------------------------------------------------
  private mappingModel(data: any): TraderDocumentFromELicensing{
    const result = new TraderDocumentFromELicensing();

    result.document_id = data.document_id;
    result.document_name = data.document_name ? data.document_name.trim() : "";

    result.issue_date = data.issue_date ? new Date(data.issue_date) : null;
    result.expiry_date = data.expiry_date ? new Date(data.expiry_date) : null;
  
    result.issue_province_name = data.issue_province_name ? data.issue_province_name.trim(): "";
    result.issue_sub_province_name = data.issue_sub_province_name ? data.issue_sub_province_name.trim(): "";

    if(result.issue_province_name.length==0) result.issue_province_name = "-";
    if(result.issue_sub_province_name.length==0) result.issue_sub_province_name = "-";

    if(result.document_name.length==0) result.document_name = "-";

    if(data.attachment){

      const attachments = new Array<any>();

      if(Array.isArray(data.attachment)){
        attachments.push(...data.attachment);
      }else{
        attachments.push(data.attachment);
      }

      attachments.forEach((item:any)=>{
        const attachment = new TraderDocumentAttachment();

        attachment.id = item.id ? item.id : -1;
        attachment.file_description = item.file_description ? item.file_description.trim() : "";
        attachment.file_extension = item.file_extension ? item.file_extension.trim() : "";
        attachment.file_fullname = item.file_fullname ? item.file_fullname.trim() : "";
        attachment.file_token = item.file_token ? item.file_token.trim() : "";

        result.attachments.push(attachment);
      });

    }

    return result;
  //-----------------------------------------------------------
  }
  //-----------------------------------------------------------
}
//-----------------------------------------------------------
