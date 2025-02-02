import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ApplicationContext } from '../../application-context';
import { LicenseListService } from '../../shared/services/license-list.service';
import { LicenseDocumentForUIList } from '../../shared/models/documentForUIList';
import { DialogRenewAllDoc } from '../../document-components/dialog-renew-all-doc/dialog-renew-all-doc.component';
import { MessageDialog } from '../../components/message-dialog/message-dialog.component';
import { DialogResult } from '../../shared/base/base-modal-dialog';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { EventResult } from '../../shared/models/result';
import { PrintDocumentService } from 'src/app/shared/services/print-document.service';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { WaitingDialog } from 'src/app/components/waiting-dialog/waiting-dialog.component';
import { LicenseType } from 'src/app/shared/enums/request-type.enum';
import { DatagridPaginationComponent } from 'src/app/components/datagrid-pagination/datagrid-pagination.component';
import { ActivatedRoute, UrlSegment } from '@angular/router';
//import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
//import { EventResult } from '../../shared/models/result';

//import { } from

@Component({
  selector: 'cdss-license',
  templateUrl: './page-license.component.html',
  styleUrls: ['./page-license.component.css']
})
export class LicenseComponent implements OnInit, AfterViewInit {

  @ViewChild("pg", { static: true }) private pg:DatagridPaginationComponent;

  public forTestRenew:boolean = false;

  public isWithExpired: boolean = false;

  @ViewChild("dialogRenewCouple", { static: true}) private renewCouple: DialogRenewAllDoc;
  @ViewChild("dialogLicenseExpire", { static: true}) private expireDialog: MessageDialog;
  @ViewChild("dialogHasRequestRenew", { static: true}) private confirmCreateDuplicateRequest_Renew: ConfirmDialog;
  @ViewChild("dialogHasRequestSubstitue", { static: true}) private confirmCreateDuplicateRequest_Substitue: ConfirmDialog;


  //
  // @ViewChild("waitingDialog", { static: false }) waitingDialog:WaitingDialog;

  public isShowListOfRenew: boolean = false;
  public isShowListOfSubstitue: boolean = false;

  constructor(
    private app: ApplicationContext,
    public repo: LicenseListService,
    private repoRequest: RequestDocumentService,
    private printService: PrintDocumentService,

    private aRoute: ActivatedRoute
    ) {
      this.app.scrollToTop();

      aRoute.url.subscribe((data: Array<UrlSegment>)=>{

        const forPath = data[data.length-1].path;
        this.isShowListOfRenew = (forPath == "renew");
        this.isShowListOfSubstitue = (forPath == "substitue");

      });

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // if(this.app.requestUpdateLicenseList){
    //     this.app.requestUpdateLicenseList = false;
    //     setTimeout(()=>{
    //       console.log('ngAfterViewInit => reload');
          this.refreshData();
    //     }, 50);
    // }else{
    //   console.log('ngAfterViewInit => refresh condition');
    //   this.refreshCondition();
    // }
  }

  //------------------------------------------
  public refreshCondition(isResetShowAll: boolean = false){

    // console.log('refreshCondition');
    // console.log('isShowListOfRenew: ', this.isShowListOfRenew);
    // console.log('isShowListOfSubstitue: ', this.isShowListOfSubstitue);

    if(isResetShowAll){
      this.isShowListOfRenew = false;
      this.isShowListOfSubstitue = false;
    }

    const isShowAll = (!this.isShowListOfRenew && !this.isShowListOfSubstitue);

    // console.log('isShowAll: ', isShowAll);

    if(isShowAll){
      this.pg.Datasource = this.repo.Datasource;
    }else{

      if(this.isShowListOfRenew && this.isShowListOfSubstitue){
        this.pg.Datasource = this.repo.Datasource.filter((item: LicenseDocumentForUIList)=>{
          return item.is_renew_period;
        });
      }else if(this.isShowListOfRenew){
        this.pg.Datasource = this.repo.Datasource.filter((item: LicenseDocumentForUIList)=>{
          return item.is_renew_period;
        });
      }else if(this.isShowListOfSubstitue){
        this.pg.Datasource = this.repo.Datasource;
      }

    }

  }
  //------------------------------------------
  public get recordCount(): number {
    // return this.repo.Datasource.length;
    return this.pg.Datasource.length;
  }
  //------------------------------------------
  public get datasource(): Array<LicenseDocumentForUIList> {
    // return this.repo.datasource;
    // console.log(this.repo.Datasource);

    // this.pg.Datasource = this.repo.Datasource;

    // this.refreshCondition();

    return this.pg.DataPage;
  }
  //------------------------------------------
  public get isLoading(): boolean {
    return this.repo.isLoading;
  }
  //------------------------------------------
  public get hideFooter(): boolean {
    return ((this.isLoading) || (!this.isLoading && this.recordCount == 0));
  }
  //------------------------------------------
  public get noData(): boolean {
    //return ((!this.isLoading) && (this.recordCount == 0) && !this.HasError);
    return ((!this.isLoading) && (this.recordCount == 0));
  }
  //------------------------------------------
  public get showData():boolean{
    return !this.noData && !this.isLoading;
  }
  public get HasError(): boolean {
    return this.repo.HasError;
  }
  //------------------------------------------
  public get ErrorMessage(): string {
    return this.repo.ErrMessage;
  }
  //------------------------------------------

  public get footerData(): string {
    let result = "";
    if (this.recordCount == 0) {
      result = "ไม่มีข้อมูล";
    } else {
      result = "จำนวน " + this.recordCount.toString() + " ข้อมูล";
    }
    return result;
  }
  //------------------------------------------
  public getRowCSS(item: LicenseDocumentForUIList) {


    let result = 'cdss-tr-inactive';

    if (item.is_active) {

      if(item.rest_of_day_to_expire<=7){
        result = "remain-07day";
      }else if(item.rest_of_day_to_expire<=14){
        result = "remain-14day";
      }else if(item.rest_of_day_to_expire<=30){
        result = "remain-30day";
      }else{
        result = 'cdss-tr-active';
      }

    }

    // console.log(item, result);

    return result;

  }
  //------------------------------------------
  //public getRenewCSS(can_renew:boolean) {
  //  return can_renew ? 'cdss-button-active' : 'cdss-button-inactive';
  //}
  //------------------------------------------
  public refreshData() {

    this.repo
      .refresh(this.isWithExpired)
      .then((isOK:boolean)=>{
        // this.pg.Datasource = this.repo.Datasource;
        // console.log('load data isOK: ',isOK);
        // console.log(this.repo.Datasource);
        this.refreshCondition();
      });
  }
  //------------------------------------------
  // @ViewChild("dialogLicensePrint", { static: true}) private dialogLicensePrint: MessageDialog;
  public printLicense(item: LicenseDocumentForUIList){
    this.printService.PrintLicenseDocumentToPDF(item.id);
  }
  //------------------------------------------
  public printFileIncluseLicense(item: LicenseDocumentForUIList){
    // todo: print directly to elicensing api
    this.printService.PrintFileIncludeOfLicenseDocumentToPDF(item.id);
  }
  //------------------------------------------
  public referenceToRenew(item: LicenseDocumentForUIList) {
    console.log('referenceToRenew: ', item);
    if (this.app.isTraderExpire) {
      this.expireDialog.openDialog();
      console.log('isTraderExpire');
      return;
    }

    if(this.hasRequestProcess(item, true)){
      this.confirmCreateDuplicateRequest_Renew.openDialog((dialog_result: DialogResult) => {
        if (dialog_result.data == true) {
          console.log('DuplicateRequest');
          this.goToRenew(item);
        }
      });
    }else{
      console.log('Renew');
      this.goToRenew(item);
    }
  }
  //------------------------------------------
  public goToRenew(item: LicenseDocumentForUIList) {

    //-------------------------------------------------
    if(!this.CanRenew(item)){
    // if(!this.forTestRenew && !this.CanRenew(item)){
      console.log("this license is not in period of renew\n or license renew only license of owner, production, enter or import only !!!.\nthis is BUG !!!, please report to Administrator");
      return;
    }
    //-------------------------------------------------
    // console.log('goToRenew : ', item);
    // const id = item.reference_request_id;
    const id = item.id;
    this.repoRequest.createRenew(0, id, (is_ok, message) => {
      if (is_ok) {
        this.app.gotoRenewPageWithReferenceToLicense(item.id);
      } else {
        console.error("ERROR : ", message);
      }
    });
    //-------------------------------------------------
  }
  //------------------------------------------
  //------------------------------------------
  public referenceToSubstitue(item: LicenseDocumentForUIList) {
    if (this.app.isTraderExpire) {
      this.expireDialog.openDialog();
      return;
    }

    if (this.hasRequestProcess(item, false)) {
      this.confirmCreateDuplicateRequest_Substitue.openDialog((dialog_result: DialogResult) => {
        if (dialog_result.data == true) {
            this.gotoSubstitue(item.id);
        }
      });
    }else{
      this.gotoSubstitue(item.id);
    }
    //-------------------------------------------------

  }
  private gotoSubstitue(id:number){
    this.repoRequest.createSubstitue(id, (is_ok, message) => {
      if (is_ok) {
        this.app.gotoSubstituePage(id);
      } else {
        console.error("ERROR : ", message);
      }
    });
  }
  //------------------------------------------
    private hasRequestProcess(item: LicenseDocumentForUIList, for_renew_not_for_substitue:boolean):boolean {

      if(for_renew_not_for_substitue){
        return (item.current_renew_to_license.length>0);
      }else{
        return (item.current_substitue_to_license.length>0);
      }

    }
  //------------------------------------------
  //public newBrowserForPrint(doc:LicenseDocumentForUIList) {
  public newBrowserForPrint(doc_id:number) {
      //window.open("/Report/LicenseDocument/" + doc_id);
      this.printService.PrintLicenseDocumentToPDF(doc_id);
  }
  //------------------------------------------
  // public movePage(arg: EventResult) {
  //   this.repo.MovePageTo(arg.data);
  // }
  // //------------------------------------------
  // public get PagingCurrentPage():number {
  //   return this.repo.CurrentPage;
  // }
  // //------------------------------------------
  // public get PagingPageCount():number {
  //   return this.repo.PageCount;
  // }
  //------------------------------------------
  public authorize_by(item:LicenseDocumentForUIList){
    //return prefix + " " + firstname + " " + lastname + " (" + position + " )";
    return item.authorize_name_prefix+" "+item.authorize_firstname+" "+item.authorize_surname+" ("+item.authorize_position_name+" )";
  }
  //------------------------------------------
  public canPrintLicenseDocument(item:LicenseDocumentForUIList): boolean{
    // return item.is_online_request;
    return item.is_esignature;
    // return true;
  }
  //------------------------------------------
  public hasFileIncludeOfLicenseDocument(item:LicenseDocumentForUIList): boolean{
    // return item.is_online_request;

    // if(item.is_esignature){
    //   console.log('', item.license_no+" : ", item.has_file_incluse);
    // }


    // return item.is_esignature && item.has_file_incluse;
    return item.is_esignature && (item.file_incluse_count>0);
  }
  //------------------------------------------
  public CanRenew(item:LicenseDocumentForUIList){

    const isLicenseOfImport = (
      item.license_type == LicenseType.License_Enter ||
      item.license_type == LicenseType.License_Import ||
      item.license_type == LicenseType.License_Production ||
      item.license_type == LicenseType.License_Owning
    );

    // return isLicenseOfImport; // for test only

    return (               // for build

      // item.current_renew_to_license.length == 0 &&

      item.is_active &&
      item.is_renew_period &&
      isLicenseOfImport
    );

  }
  //------------------------------------------
  public CanSubstitue(item:LicenseDocumentForUIList){
    return false;
    // return (
    //   item.is_active &&
    //   // item.is_renew_period &&
    //   (
    //     item.license_type == LicenseType.License_Enter ||
    //     item.license_type == LicenseType.License_Import ||
    //     item.license_type == LicenseType.License_Production ||
    //     item.license_type == LicenseType.License_Owning
    //   )
    // );

  }
  //------------------------------------------
  public get RowNo():number{
    return this.pg.RowNo;
  }
  //------------------------------------------------


}


