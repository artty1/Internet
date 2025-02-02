import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ServerResult, ServerConfig } from '../models/result';
import { API_Document, API_DocumentRequestReference, API_RequestDocumentDetail, API_UserReference, API_LookupFilter, API_LookupFilterSet } from './../models/api-parameter';
import { Configuration } from '../../app-config';
import { ApplicationContext } from '../../application-context';
import { RequestDocument } from '../models/request-document';
import { ServerResultCode } from '../enums/server_result_code.enum';

// import { CheckCriticalError } from './../helpers/check-critical-error';

//@Injectable({
//  providedIn: 'root'
//})
export class BaseService<T> {

  protected url: string;

  protected is_loading: boolean;
  protected data: T;
  protected last_refresh: Date;
  //protected config: ServerConfig;
  protected config: Configuration;

  private has_firsttime_load: boolean;

  protected has_last_error: boolean;
  protected last_error_message: string;

  //protected paging: Pageable<T> = null;
  //protected search: Searchable = null;
  //protected searchModel: ISearchModel = null;
  //-------------------------------------
  //constructor(protected app: ApplicationContext, protected http: HttpClient, private toURL: string, protected withPaging: DataSourceMethod = DataSourceMethod.None, protected withSearchModel: ISearchModel = null) {
  //constructor(protected app: ApplicationContext, protected http: HttpClient, private toURL: string, protected withPaging: DataSourceMethod = DataSourceMethod.None) {
  constructor(protected app: ApplicationContext, protected http: HttpClient, private toURL: string) {

    this.is_loading = false;
    this.has_firsttime_load = false;
    this.config = this.app.Configuration;
    this.url = toURL;

    // if (withPaging != DataSourceMethod.None) {
    //   let dummnyClass: { new(): T };
    //   this.paging = new Pageable(this);
    // }


  }
  //-------------------------------------
  protected loadData(param:any=null) {
    throw new Error("method loadData not implement !!!!");
  }
  //-------------------------------------
  public get lastDataWhen(): Date {
    return this.last_refresh;
  }
  //-------------------------------------
  public clearData() {
    this.data = null;
  }
  //-------------------------------------
  public refresh(param: any = null) {

    this.is_loading = true;
    this.has_firsttime_load = true;

    if (param == null) {
      this.loadData();
    } else {
      this.loadData(param);
    }

  }
  //-------------------------------------
  public get isLoading(): boolean {
    return this.is_loading;
  }
  //-------------------------------------
  public get Datasource(): T {
    return this.data;
  }
  //-------------------------------------
  public get hasData(): boolean {

    let result: boolean=false;

    if (Array.isArray(this.data)) {
      result = (this.data.length > 0);
    } else {
      result = (this.data != null);
    }

    return result;
  }
  //-------------------------------------
  public get HasError(): boolean {
    return this.has_last_error;
  }
  //-------------------------------------
  public get ErrMessage(): string {
    return this.last_error_message;
  }
  //-------------------------------------
  protected postToURL(url: string, params: any = null, callbackOK: Function, callbackError: Function) {

    this.is_loading = true;

    this.http.post(url, params).toPromise<any>()
    .then((res:any)=>{
      // console.log("postToURL : ", res);
      let result:ServerResult = ServerResult.setServerResult(res);
      if(result.has_error){
        callbackError(result);
      }else{
        callbackOK(result);
      }

      this.is_loading = false;
    })
    .catch((err:any)=>{
      let result:ServerResult= new ServerResult();

      if(err instanceof HttpErrorResponse){
        let error = <HttpErrorResponse>err;

        switch(error.status){
          case 0:
            result.result_code = ServerResultCode.INTERNET_CONNECTION_ERROR;
            result.message.push("Internet Connection Error !!!");
            break;
          case 500:
            result.result_code = ServerResultCode.SERVER_ERROR;
            result.message.push("Server Error !!!");
            break;
        }

      }

      result.has_error = true;

      callbackError(result);

      this.is_loading = false;
    });

    // this.http.post(url, params).subscribe((res: any) => {

    //   let result = new ServerResult();

    //   if(IsNetworkConnectionError(res)){
    //     result.data = null;
    //     result.has_error = true;
    //     result.message = 'Internet Connection Error !!!'
    //     result.result_code = ServerResultCode.INTERNET_CONNECTION_ERROR;
    //     console.log(result.message);
    //     callbackError(result);

    //     return;
    //   }
    //   // -------------------------------------

    //   if (ServerResult.isServerResult(res)) {

    //     result.data = res.data;
    //     result.result_code = res.result_code;
    //     result.has_error = res.has_error;
    //     result.message = res.message;

    //     if (result.has_error) {
    //       callbackError(result);
    //     } else {
    //       callbackOK(result);
    //     }

    //   } else {
    //     result.data = null;
    //     result.has_error = true;
    //     result.message = 'no pattern of server result '
    //     console.log(result.message);
    //     callbackError(result);
    //   }

    //   this.is_loading = false;

    // });

  }
  //-------------------------------------
  protected post(params: any = null, callbackOK: Function, callbackError: Function){

    let url = this.buildAPIURL(this.url);

    // console.log(url, params);

    this.postToURL(url, params, callbackOK, callbackError);

  }
  //-------------------------------------
  protected buildAPIURL(url: string): string {
    return this.app.Configuration.api_url+url;
  }
//.....................................
  protected buildAPIParam_Document(doc_id:number = 0, flag_something:boolean = false): API_Document {
    let result = new API_Document();
    this._buildBaseParam(result, flag_something);
    result.doc_id = doc_id;
    return result;
  }
  protected buildAPIParam_RequestDocumentDetail(doc_id: number, data: RequestDocument, flag_something: boolean = false): API_RequestDocumentDetail {
    let result = new API_RequestDocumentDetail();
    this._buildBaseParam(result, flag_something);
    result.doc_id = doc_id;
    result.data = data;
    return result;
  }
  protected buildAPIParam_DocumentRequestReference(req_doc_id: number, license_id: number,flag_something: boolean = false): API_DocumentRequestReference {
    let result = new API_DocumentRequestReference();
    this._buildBaseParam(result, flag_something);
    result.request_doc_id = req_doc_id;
    result.license_id = license_id;
    return result;
  }
  private _buildBaseParam(param: API_UserReference, flag_something: boolean) {
    param.flag_something = flag_something;
    param.trader_id = this.app.currentUser.trader_id;
    param.user_code = this.app.currentUser.user_code;
    param.token = this.app.token;
  }
  //.....................................
  protected buildAPIParam_UserReference(flag_something: boolean = false): API_UserReference {
    let result = new API_UserReference();

    result.flag_something = flag_something;
    result.trader_id = this.app.currentUser.trader_id;
    result.user_code = this.app.currentUser.user_code;
    result.token = this.app.token;

    return result;
  }
  //.....................................
  protected buildAPIParam_LookupFilter(critetia: string = ""): API_LookupFilter {
    let result = new API_LookupFilter();
    this._buildBaseParam(result, false);
    result.criteria = critetia;

    return result;
  }
  //.....................................
  protected buildAPIParam_LookupFilterSet(critetia: Array<string>): API_LookupFilterSet {
    let result = new API_LookupFilterSet();
    this._buildBaseParam(result, false);
    result.criteria = critetia;

    return result;
  }
  //.....................................
  protected getDataFromDataSource(fieldCompare: string, dataCompare: any): any {

    let result = null;
    // ................................
    for (let item in this.data) {

      let eachItem = this.data[item];

      if (eachItem[fieldCompare] == dataCompare) {
        result = eachItem;
        break;
      }

    }
    // ................................
    return result;
  }
  //-------------------------------------
  protected getDataFromObjectArray(dataSource:Array<any>, fieldCompare: string, dataCompare: any): any {

    let result = null;
    // ................................
    for (let item in dataSource) {

      if (item[fieldCompare] == dataCompare) {
        result = item;
        break;
      }

    }
    // ................................
    return result;
  }
  //---------------------------------------------------------------------
  //------ property for paging, error if paging is not set  -------------
  //---------------------------------------------------------------------
  // public CalculatePage():void {
  //   if (this.paging != null) {
  //     //console.log('this.paging : ', this.paging);
  //     this.paging.CalculatePage();
  //   }
  // }
  // //-------------------------------------
  // public get PageSize(): number {
  //   return this.paging.PageSize;
  // }
  // //-------------------------------------
  // public get PageCount(): number {
  //   return this.paging.PageCount;
  // }
  // //-------------------------------------
  // public get CurrentPage(): number {
  //   return this.paging.CurrentPage;
  // }
  // //-------------------------------------
  // public get DataPaging():T {
  //   return this.paging.DataPaging;
  // }
  // //-------------------------------------
  // public MovePageTo(page_no:number):void {
  //   this.paging.MovePageTo(page_no);
  // }
  //-------------------------------------
  //-------------------------------------

  //public httpGet_DownloadFile(url: string, headers: any=null){
  public httpGet_DownloadFile(url: string, options: any){

    this.http.get(url, options).subscribe((resp)=>{
      console.log(resp);
    });

  }
  // public httpPost_DownloadFile(url: string, data:any=null, options: any=null){

  // }
}
//--------------------------------------------------------------------------
// export class Pageable<T> {
//   protected page_size: number = 10;
//   protected page_count: number = 0;
//   protected current_page: number = 0;
//   private data_paging: any;

//   private bs: BaseService<T>;

//   constructor(private baseService: BaseService<T>) {
//     this.bs = baseService;
//   }

//   public get PageSize(): number {
//     return this.page_size;
//   }
//   //-------------------------------------
//   public get PageCount(): number {
//     return this.page_count;
//   }
//   //-------------------------------------
//   public get CurrentPage(): number {
//     return this.current_page;
//   }
//   //-------------------------------------
//   public get DataPaging(): T {
//     return this.data_paging;
//   }
//   //-------------------------------------
//   public MovePageTo(page_no: number): void {
//     this.movePage(page_no);
//   }
//   //-------------------------------------
//   private get datasource(): any {
//     return this.bs.datasource;
//   }
//   //-------------------------------------
//   public CalculatePage() {
//     let data_count = this.datasource.length;

//     this.page_count = Math.ceil(data_count / this.page_size);

//     //if (this.page_count > 0) {
//     //  this.current_page = 1;
//     //} else {
//     //  this.current_page = 0;
//     //}

//     this.movePage(1);
//     //console.log(data_count, this.page_count, this.current_page);

//   }
//   //-------------------------------------
//   private movePage(page_no:number) {
//     //console.log('MovePageTo(' + page_no + ')');

//     if (page_no < 1) {
//       page_no = 1;
//     } else if (page_no > this.page_count) {
//       page_no = this.page_count;
//     }

//     this.current_page = page_no;

//     let startIndex = (this.current_page - 1) * this.page_size;
//     let stopIndex = startIndex + this.page_size;

//     if (stopIndex > this.datasource.length) stopIndex = this.datasource.length;


//     this.data_paging = this.datasource.slice(startIndex, stopIndex);


//     //console.log(startIndex, stopIndex, this.datasource.slice(0, 2), this.data_paging, this.current_page);
//     //console.log('data_paging : ', this.data_paging);

//   }
//   //-------------------------------------
// }
// //--------------------------------------------------------------------------
// export class Searchable {

//   constructor() {

//   }
// }
// //--------------------------------------------------------------------------
// export interface ISearchModel {

// }
// //--------------------------------------------------------------------------
export enum DataSourceMethod {
  ServerSide, ClientSide, None
}
//--------------------------------------------------------------------------
