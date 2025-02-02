import { Injectable } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { HttpClient } from '@angular/common/http';
import { RequestDocumentForUIList } from '../models/documentForUIList';
import { ServerResult } from '../models/result';
import { BaseService, DataSourceMethod } from './../base/base.service';
import { RequestDocumentType } from '../enums/request-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DraftListService extends BaseService<Array<RequestDocumentForUIList>> {

  constructor(
    protected app: ApplicationContext,
    protected http: HttpClient
  ) {

    super(app, http, 'request/draft');

    this.data = new Array();
    this.refresh();

  }
  //------------------------------
  public getDocumentByType(req_type: RequestDocumentType): Array<RequestDocumentForUIList> {
    return this.data.filter(doc => doc.request_type == req_type);
  }
  //------------------------------
  public getDocument(): Array<RequestDocumentForUIList> {
    return this.data;
  }
  //------------------------------
  protected loadData() {
    let params = this.buildAPIParam_Document();

    this.data.length = 0;

    this.post(params,
      (result:ServerResult) => {
        this.data = result.data;
      }, (err:ServerResult) => {
        console.log(err);
      });
  }
 //----------------------------------------------------
  public deleteDraft(doc_id: number, callbackDelete:Function) {

    let url = this.buildAPIURL('request/deletedraft');

    let params = this.buildAPIParam_Document(doc_id);

    this.postToURL(url, params,
      result => {
        callbackDelete(!result.has_error, result.message);
      }, err => {
        console.log(err);
      });

  }

}
