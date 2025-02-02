import { Injectable } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PrintDocumentService extends BaseService<string> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'report');
  }
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  public PrintRequestDocumentToPDF(request_id: number) {
    let url = this.buildAPIURL("report/requestdocument");
    const tabName = "request-"+request_id.toString();
    this.printDocumentToPDF(tabName, url, request_id);
  }
  // ----------------------------------------------------------
  public PrintLicenseDocumentToPDF(license_id: number) {

    let url = this.buildAPIURL("report/licensedocument");
    const tabName = "license-"+license_id.toString();
    this.printDocumentToPDF(tabName, url, license_id);

  }
  // ----------------------------------------------------------
  public PrintFileIncludeOfLicenseDocumentToPDF(license_id: number) {

    const url = this.buildAPIURL("report/includelicensedocument");
    const tabName = "appendix-of-license-"+license_id.toString();
    this.printDocumentToPDF(tabName, url, license_id);

  }
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  private printDocumentToPDF(tabName:string, url:string, doc_id:number, isPost: boolean = true, isWithStandardParam: boolean = true){
    let param = this.buildAPIParam_Document(doc_id);
    let form_name:string = "form-pdf-"+doc_id;

    let form = document.createElement("form");
    form.name = form_name;
    form.id = form_name;
    form.target = tabName;
    form.method = isPost ? "POST" : "GET";
    form.action = url;

    if(isWithStandardParam){
      for(let ele in param){
        let input = document.createElement("input");
        input.type = "text"
        input.name = ele;
        input.value = param[ele];

        form.appendChild(input);
      }
    }


    document.body.appendChild(form);
    form.submit();

    setTimeout(()=>{
      document.body.removeChild(form);
    }, 100);

  }
  // ----------------------------------------------------------

}
