import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationContext } from "src/app/application-context";
import { RequestDocument } from "src/app/shared/models/request-document";
import { RequestDocumentService } from "src/app/shared/services/request-document.service";


import { RequestFileInclude, RequestFileItem } from './../section-file-include/models';

// @Injectable({
//   providedIn: 'root'
// })

// export class RequestDocumentService extends BaseService<RequestDocument> {
export class UploadService {

  private _url = 'license-req/attachment';

  constructor(
    protected app: ApplicationContext,
    protected http: HttpClient,
    // protected repo: RequestDocumentService
  ){

  }
  //--------------------------------------------------------------------
  public loadIncludeFileList(reqDoc: RequestDocument): Promise<RequestFileInclude> {

    let promiseResult: Promise<RequestFileInclude>;

    // const docId: number = this.repo.currentDocument.ID;
    const docId: number = reqDoc.ID;

    if(docId>0){
      // const url = this.app.buildELicensingAPIURL(this._url, this.repo.currentDocument.ID.toString());
      const url = this.app.buildELicensingAPIURL(this._url, docId.toString());
      const options = this.app.httpOptionsOfElicensing;

      promiseResult = new Promise((resolve, reject)=>{
        console.log(url);
        this.http
          .get(url, options)
          .toPromise<any>()
          .then((resp: any)=>{
            // console.log('Load file include: ', resp);

            const result = new RequestFileInclude();
            const files: Array<any> = resp.body.data.documents[0].files;

            files.forEach((item: any)=>{
              // console.log(item);
              const f = new RequestFileItem(
                item.id ? item.id : 0,
                item.name ? item.name : "",
                item.token ? item.token : "",
                item.for_delete ? item.for_delete : false,
                item.file_extension ? item.file_extension : ""
              );

              result.fileItems.push(f);

            });

            // doc.fileInclude = result;
            // this.repo.currentDocument.fileInclude = result;
            reqDoc.fileInclude = result;

            resolve(result);
          })
          .catch((err: any)=>{
            console.log('Error load file include: ', err);
            reject(err);
          });


      });

    }else{
      promiseResult = new Promise((resolve, reject)=>{
        // console.log('no load include file because doc id == 0');
        resolve(new RequestFileInclude());
      });
    }

    return promiseResult;

  }
  //--------------------------------------------------------------------
  public buildURLForView(item: RequestFileItem):string{
    const result = this.app.buildELicensingAPIURL('download', item.token);
    return result;
  }
  //--------------------------------------------------------------------
  public downloadFile(item: RequestFileItem, callback){
    const url = this.buildURLForView(item);
    const options = this.app.httpOptionsFromBlobOfElicensing;

    this.http.get(url, options).subscribe((resp)=>{
      const blob = new Blob([resp], { type: 'application/pdf' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);

      callback(true, null);

    }, (error)=>{
      console.log(error);
      callback(false, error);
    });
  }
  //--------------------------------------------------------------------
  public saveAllIncludeFile(reqId: number, fileInclude: RequestFileInclude, callback:Function = null){

    if(!fileInclude.hasDirtyItem){
      // console.log('no file upload to update');

      if(callback){
        callback(true, null);
      } else{
        return;
      }

    }
    //-------------------------------------
    const url = this.app.buildELicensingAPIURL('license-req', 'attachment');
    const options = this.app.httpOptionsOfElicensing;
    const files = fileInclude.getDirtyItems.map((f: RequestFileItem)=>{
      return {
        id: f.id,
        name: f.name,
        token: f.token,
        for_delete: f.for_delete,
        file_extension: f.file_extension
      }
    })
    const data:any = {
      request_id: reqId,
      documents: [
        {
          document_id: 41,
          document_name: "เอกสารประกอบคำขออนุญาตอื่น ๆ",
          issue_date: null,
          expiry_date: null,
          files: files
        }
      ]
    }

    // console.log('save include file : ', url, data);
    // console.log('------------------------------------');
    this.http
      .post(url, data, options)
      .toPromise()
      .then((resp:any)=>{
        // console.log('resp : ', resp);
        if(callback) callback(true, resp);
      })
      .catch((err:any)=>{
        console.log("Error : ", err);
        if(callback) callback(false, err);
      })

  }
  //--------------------------------------------------------------------
}
