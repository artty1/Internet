import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationContext } from '../../../application-context';
import { PermissionMode, RequestDocumentType } from '../../../shared/enums/request-type.enum';
//import { EventResult } from '../../../shared/models/result';
//import { ModalDialogComponent } from '../../../components/modal-dialog/modal-dialog.component';
import { MessageDialog } from '../../../components/message-dialog/message-dialog.component';
import { DialogResult } from '../../../shared/base/base-modal-dialog';
import { RequestDocument } from '../../../shared/models/request-document';
import { WaitingDialog } from 'src/app/components/waiting-dialog/waiting-dialog.component';
import { ProductService } from 'src/app/shared/services/lookup/product.service';
import { ProductGroupService } from 'src/app/shared/services/lookup/product-group.service';
import { ELicensingService } from 'src/app/shared/services/elicensing.service';
import { ServerResult } from 'src/app/shared/models/result';
import { UnitService } from 'src/app/shared/services/lookup/unit.service';
import { DownloadService } from 'src/app/shared/services/download.service';




@Component({
  selector: 'cdss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // @ViewChild("waitingDialog", { static: false}) waitingDialog:WaitingDialog;


  public isShowExpireDialog: boolean;

  private popupExpireDialog: MessageDialog;

  constructor(
    public app: ApplicationContext,
    private repoProduct:ProductService,
    private repoProductGroup:ProductGroupService,
    private repoUnit: UnitService,
    private attachment: ELicensingService,
    private downloadService: DownloadService,
    private eLicensingService: ELicensingService
  ) {
    this.app.scrollToTop();
    this.isShowExpireDialog = false;

    // console.log('trader ', this.app.traderInformation);
    // console.log('isTraderExpire ', this.app.isTraderExpire);
    // console.log('PermissionMode.CREATE: ', this.app.IsPermissionForRequest(RequestDocumentType.EnterWithOwner, PermissionMode.CREATE));

    // console.log('>> ', !this.app.isTraderExpire && this.app.IsPermissionForRequest(RequestDocumentType.EnterWithOwner, PermissionMode.CREATE));

    setTimeout(() => {
      // console.log("preload product data...");
      this.eLicensingService
        .loadDocumentAttactment()
        .then((result: ServerResult)=>{
          this.app.setTraderDocumentInfo(result.data);
        })
        .catch((err: any)=>{
          alert('error load document: ');
          console.log('error load document: ', err);
        });
      this.init_preload_data();
    }, 50);

  }

  ngOnInit() {
  }

  private init_preload_data(){
    this.repoProductGroup.refresh();
    this.repoProduct.refresh();
    this.repoUnit.refresh();
  }
  //----------------------------------------------------------
  private popupWarningDialog: MessageDialog;

  public initDialog(arg: DialogResult) {
    if (arg.sender.tag == "message-expire") {
      this.popupExpireDialog = arg.sender;
    }

    // ---- https://app.clickup.com/t/860qugcwj -------------------------
    if(arg.sender.tag == "message-warinig"){
      this.popupWarningDialog = arg.sender;

      if(!this.app.isShowFirstPageWarning){

        setTimeout(()=>{
          this.popupWarningDialog.openDialog();
          this.app.isShowFirstPageWarning = true;
        }, 50);
      }

    }
    // ----------------------------------------------------------------------
  }
  //----------------------------------------------------------
  public get isTraderExpired():boolean {
    return this.app.isTraderExpire;
  }


  //public gotoCreateDraft(reqType: RequestType) {
  public gotoCreateDraft(reqType: RequestDocumentType) {

    // console.log();

    if (this.app.isTraderExpire) {
      this.showExpireMessage();
    } else {
      this.app.gotoNewDraft(reqType);
    }

  }
  // -----------------------------------------
  public closeExpireDialog() {
    this.isShowExpireDialog = false;
  }
  // -----------------------------------------
  public gotoCreateDraftEnter() {
    this.gotoCreateDraft(RequestDocumentType.EnterWithOwner);
  }
  public gotoCreateDraftCrossBorder() {
    this.gotoCreateDraft(RequestDocumentType.CrossBorder);
  }
  public gotoCreateDraftExport() {
    this.gotoCreateDraft(RequestDocumentType.Export);
  }
  public gotoCreateDraftExportSpecial() {
    this.gotoCreateDraft(RequestDocumentType.ExportSpecial);
  }
  public gotoCreateDraftImport() {
    this.gotoCreateDraft(RequestDocumentType.ImportWithOwner);
  }
  public gotoCreateDraftOwning() {
    this.gotoCreateDraft(RequestDocumentType.Owner);
  }
  public gotoCreateDraftProduction() {
    this.gotoCreateDraft(RequestDocumentType.ProductionWithOwner);
  }
  //public gotoCreateDraftRenewal() {
  //  //this.gotoCreateDraft(RequestType.Renewal);
  //  //use command in license page instead !!!
  //  //this.gotoCreateDraft(RequestDocumentType.Renewal);
  //}
  public gotoCreateDraftSendSample() {
    this.gotoCreateDraft(RequestDocumentType.SendSample);
  }
  public gotoCreateArt() {
    this.gotoCreateDraft(RequestDocumentType.Artty);
  }
  //public gotoCreateDraftSubstitute() {
  //   //use command in license page instead !!!
  //  this.gotoCreateDraft(RequestDocumentType.Substitute);
  //}
  // -----------------------------------------
  public showExpireMessage() {
    this.popupExpireDialog.openDialog();
  }
  //--------------------------------------------
  public get CanCreateDraftEnter(): boolean {

    //---------------------------------------------
    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    return (
      !this.app.isTraderExpire &&
      this.app.IsPermissionForRequest(RequestDocumentType.EnterWithOwner, PermissionMode.CREATE)
    );
    //---------------------------------------------
  }
  public get CanCreateDraftImport(): boolean {
      //---------------------------------------------
    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    // temp true for test 20230612
    return true; //false;
    //   !this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.ImportWithOwner, PermissionMode.CREATE)
    // );
  }
  public get CanCreateDraftProduction(): boolean {
    //---------------------------------------------
    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    // temp true for test 20230612
    return true; //false;
    // return (
    //   !this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.ProductionWithOwner, PermissionMode.CREATE)
    // );
  }
  public get CanCreateDraftOwner(): boolean {

    //---------------------------------------------
    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    // temp true for test 20230612
    return true; //false;
    // if(!this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.Owner, PermissionMode.CREATE)
    // ){
    //   return true;
    // }else{
    //   return null;
    // }
    //---------------------------------------------

    // return (
    //   !this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.Owner, PermissionMode.CREATE)
    // );
  }
  public get CanCreateDraftRenewal(): boolean {
    //return this.app.IsPermissionForRequest(RequestDocumentType.Renewal, PermissionMode.CREATE);
    // code for each reneval or all of reneval, again !!!
    // return false;
    // temp true for test 20230612
    return true; //false;
  }
  public get CanCreateDraftSubstitute(): boolean {
    return (
      !this.app.isTraderExpire &&
      this.app.IsPermissionForRequest(RequestDocumentType.Substitute, PermissionMode.CREATE)
    );
  }
  public get CanCreateDraftSample(): boolean {

    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    // temp true for test 20230612
    return true; //false;
    //---------------------------------------------
    // return (
    //   !this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.SendSample, PermissionMode.CREATE)
    // );
  }
  public get CanCreateDraftExport(): boolean {
    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    // temp true for test 20230612
    return true; //false;

    // return (
    //   !this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.Export, PermissionMode.CREATE)
    // );
    //---------------------------------------------
  }
  public get CanCreateDraftExportSpecial(): boolean {
    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    // temp true for test 20230612
    return true; //false;
    // return (
    //   !this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.ExportSpecial, PermissionMode.CREATE)
    // );
      //---------------------------------------------
  }
  public get CanCreateDraftCrossBorder(): boolean {
    // ------------- disabled for https://app.clickup.com/t/860quhxan  -------------------
    // return false;
    // temp true for test 20230612
    return true; //false;
    // return (
    //   !this.app.isTraderExpire &&
    //   this.app.IsPermissionForRequest(RequestDocumentType.CrossBorder, PermissionMode.CREATE)
    // );
    //---------------------------------------------
  }
  public gotoRenewManual(){
    this.downloadService.manualRenew();
  }
  //---------------------------------------------

}
