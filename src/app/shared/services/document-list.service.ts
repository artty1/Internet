import { Injectable } from '@angular/core';

import { ApplicationContext } from '../../application-context';
import { HttpClient } from '@angular/common/http';
import { RequestDocumentForUIList } from '../models/documentForUIList';
import { DocumentStatus } from '../enums/document-status.enum';
import { ServerResult } from '../models/result';
import { BaseService } from './../base/base.service';
import { RequestDocumentType } from '../enums/request-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DocumentListService extends BaseService<Array<RequestDocumentForUIList>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {

    super(app, http, 'request/all');

    this.data = new Array();
    this.loadData();

  }
  //------------------------------
  public get isLoad():boolean {
    return this.is_loading;
  }
  //------------------------------
  public get DataSince(): Date {
    return this.lastDataWhen;
  }
  //------------------------------
  public refresh() {
    this.loadData();
  }
  //------------------------------
  public getDocumentByType(req_type: RequestDocumentType): Array<RequestDocumentForUIList> {
    return this.data.filter(doc => doc.request_type == req_type);
  }
  //------------------------------
  public getDocumentByStatus(doc_status: DocumentStatus): Array<RequestDocumentForUIList> {
    return this.data.filter(doc => doc.request_status == doc_status);
  }
  //------------------------------
  protected loadData() {

    let params = this.buildAPIParam_UserReference();
    this.is_loading = true;
    this.data.length = 0;

    let resetLoading = ()=>{
      setTimeout(() => {
        this.is_loading = false;
      }, 10);

    }

    this.post(params,
      (result:ServerResult) => {
        this.data.push(...result.data);
        resetLoading();
      }, (err:ServerResult) => {
        console.log(err);
        resetLoading();
      });
  }

}
