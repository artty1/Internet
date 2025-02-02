import { Injectable } from '@angular/core';
import { ApplicationContext } from '../../application-context';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private excelTemplate_Appendix = 'TemplateOfAppendix';
  private excelTemplate_Consession = 'TemplateOfConsession';
  private pdfManual_renew = 'ManualRenew';

  constructor(protected app:ApplicationContext, protected http:HttpClient) {

  }
  // --------------------------------------
  // public templateOfAppendix() {
  //   let url = this.app.buildDownloadPath(this.app.Configuration.excel_template_for_appendix);
  //   window.open(url);
  // }
  // // --------------------------------------
  // public templateOfConsession() {
  //   let url = this.app.buildDownloadPath(this.app.Configuration.excel_template_for_consession);
  //   window.open(url);
  // }
  // --------------------------------------
  public manualRenew() {
    let url = this.app.buildDownloadPath(this.pdfManual_renew);
    window.open(url);
  }
  // --------------------------------------
}
