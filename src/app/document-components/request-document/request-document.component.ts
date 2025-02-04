import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy,
  ViewChild,
} from "@angular/core";

import { RequestDocumentType } from "./../../shared/enums/request-type.enum";
import { ApplicationContext } from "../../application-context";
//import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
//import { EventResult } from '../../shared/models/result';

import routeDef from "./../../shared/data/route-definition";
import { RequestDocumentService } from "../../shared/services/request-document.service";
import { DialogResult } from "../../shared/base/base-modal-dialog";
import { ConfirmDialog } from "../../components/confirm-dialog/confirm-dialog.component";
import { MessageDialog } from "../../components/message-dialog/message-dialog.component";
import { WaitingDialog } from "../../components/waiting-dialog/waiting-dialog.component";

import { BaseSection } from "../../shared/base/base-section";
import {
  RequestDocument,
  SubmitInfo,
} from "../../shared/models/request-document";
import { DocumentStatus } from "src/app/shared/enums/document-status.enum";
import { UploadService } from "../section-file-include/upload.service";
import { HttpClient } from "@angular/common/http";
import { ELicensingService } from "src/app/shared/services/elicensing.service";
import { ServerResult } from "src/app/shared/models/result";
import { PopupTraderDocument } from "../popup-trader-document/popup-trader-document.component";

declare var $: any;

@Component({
  selector: "cdss-request-document",
  templateUrl: "./request-document.component.html",
  styleUrls: ["./request-document.component.css"],
})
//export class RequestDocumentComponent implements OnInit, OnDestroy {
export class RequestDocumentComponent implements OnInit {
  private _reqType: RequestDocumentType;

  public cancelDialog: ConfirmDialog;
  public submitDialog: ConfirmDialog;
  // public errorDialog: MessageDialog;
  public messageDialog: MessageDialog;
  public waitSaveDialog: WaitingDialog;

  private reSubmitDialog: ConfirmDialog;

  public whileSaving: boolean;
  public isSaveSubmit: boolean;
  public isSaveSuccess: boolean;
  public isSaveError: boolean;
  public isValidateError: boolean;

  private sections: Array<BaseSection> = new Array();

  public isShowCommandPalate: boolean = true;

  private eLicensingService: ELicensingService = null;
  // private popupTraderDocument: PopupTraderDocument = null;
  // public submit_message:string = '';

  @ViewChild("popupTraderDocument", { static: true })
  private popupTraderDocument: PopupTraderDocument;

  //-------------------------------------------------------
  constructor(
    private app: ApplicationContext,
    public repo: RequestDocumentService,
    public http: HttpClient
  ) {
    this.resetModalState();

    // console.log('document: ', this.repo.currentDocument);
  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  // ngOnDestroy(): void {
  //   this.destroyDialogtraderDocument();
  // }
  //-------------------------------------------------------
  ngOnInit() {}
  //-------------------------------------------------------
  //-------------------------------------------------------
  public initModal(args: DialogResult) {
    if (args.sender.tag == "x") {
      this.cancelDialog = args.sender;
    } else if (args.sender.tag == "p") {
      this.submitDialog = args.sender;
      this.submitDialog.isEnableButtonOK = false;
    } else if (args.sender.tag == "error") {
      this.messageDialog = args.sender;
    } else if (args.sender.tag == "wait") {
      this.waitSaveDialog = args.sender;
    } else if (args.sender.tag == "r") {
      this.reSubmitDialog = args.sender;
    }
  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  public get submit_message(): string {
    return this.repo.currentDocument.submit_message;
  }
  //-------------------------------------------------------
  public set submit_message(value: string) {
    this.repo.currentDocument.submit_message = value;
  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  public isConfirmSubmit: boolean = false;
  //return this.repo.currentDocument.confirm??????;
  public get confirm_submit(): boolean {
    return this.isConfirmSubmit;
    //return this.repo.currentDocument.confirm??????;
  }
  //-------------------------------------------------------
  public set confirm_submit(value: boolean) {
    this.isConfirmSubmit = value;
  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  public swapSaveButton() {
    this.submitDialog.isEnableButtonOK = this.isConfirmSubmit;
  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  public initSection(section: BaseSection) {
    // console.log(section.Title, " valid order : ", section.v_order);
    this.sections.push(section);
  }
  //-------------------------------------------------------
  public get requestDocumentType(): RequestDocumentType {
    //console.log('this.repo.currentDocument : ', this.repo.currentDocument.LogicOfDocument.requestType);
    return this.repo.currentDocument.LogicOfDocument.requestType;
  }
  //-------------------------------------------------------
  public get isTraderExpire(): boolean {
    return this.app.isTraderExpire;
  }
  //-------------------------------------------------------
  public saveDraft() {
    if (!this.validateData(false)) {
      return false;
    }
    //----------------------------------
    // console.log('saveDraft : ', this.repo.currentDocument);
    this.whileSaving = true;
    this.isSaveSubmit = false;

    this.waitSaveDialog.openDialog();

    setTimeout(() => {
      this.repo.saveDraft((is_success, message) => {
        this.whileSaving = false;
        this.isSaveSuccess = is_success;

        if (is_success) {
          // console.log('Save Draft Success : ', message);
        } else {
          this.waitSaveDialog.closeDialog();
          this.isSaveError = true;
          this.messageDialog.openDialog();
          console.log("Save Draft Error : ", message);
        }
      });
    }, 50);

    //----------------------------------
  }
  //-------------------------------------------------------
  public confirmSubmit() {
    if (!this.repo.currentDocument.SubmitInfoHistory) {
      this.repo.currentDocument.SubmitInfoHistory = new Array();
    }

    console.log(
      "SubmitInfoHistory: ",
      this.repo.currentDocument.SubmitInfoHistory
    );
    const isReSubmit: boolean =
      this.repo.currentDocument.SubmitInfoHistory.length > 0;

    if (!this.validateData(true)) {
      return false;
    }
    //-----------------------------------

    if (isReSubmit) {
      this.reSubmitDialog.openDialog((result: DialogResult) => {
        if (result.data == true) {
          this.submitRequest(isReSubmit);
        }
      });
    } else {
      this.submitDialog.openDialog((result: DialogResult) => {
        if (result.data == true) {
          this.submitRequest(isReSubmit);
        }
      });
    }
  }
  //-------------------------------------------------------
  public submitRequest(isResubmit: boolean = false) {
    //----------------------------------
    this.whileSaving = true;
    this.isSaveSubmit = true;
    this.waitSaveDialog.openDialog();
    //----------------------------------
    this.repo.saveSubmit((is_success, message) => {
      //this.whileSaving = false;
      //this.isSaveSuccess = is_success;
      //alert('is_success : ' + is_success);

      if (is_success) {
        this.whileSaving = false;
        this.isSaveSuccess = is_success;
        // console.log('Submit Request Success : ', message);
      } else {
        console.log("Submit Request Error : ", message);
        this.waitSaveDialog.closeDialog();
        this.isSaveError = true;
        this.messageDialog.openDialog();
      }
    });
  }
  //-------------------------------------------------------
  public discardDraft() {
    this.cancelDialog.openDialog((result) => {
      if (result.data) {
        this.app.gotoPage(routeDef.pageNew);
      }
    });
  }
  //--------------------------------------------------------
  public gotoPageSubmit() {
    this.waitSaveDialog.closeDialog();
    this.app.gotoSubmit();
  }
  //--------------------------------------------------------
  public gotoPageDraft() {
    this.waitSaveDialog.closeDialog();
    this.app.gotoDraftDashboard();
  }
  //--------------------------------------------------------
  public stillEditDocument() {
    this.waitSaveDialog.closeDialog();

    const draftId = this.repo.currentDocument.ID;

    this.repo.loadDraftDocument(draftId, (isOk: boolean, message: string) => {
      this.isSaveError = false;
      this.whileSaving = false;
      this.isSaveSuccess = false;

      const uploadService = new UploadService(this.app, this.http);
      uploadService.loadIncludeFileList(this.repo.currentDocument);

      if (isOk) {
      }

      this.app.gotoDraft(draftId);
    });
  }
  //--------------------------------------------------------
  private validateData(forSubmit: boolean = false): boolean {
    let hasError: boolean = false;
    // ----------------------------------------------
    let sectionByOrder = this.sections.sort((s1, s2) => {
      if (s1.v_order < s2.v_order) {
        return -1;
      } else if (s1.v_order > s2.v_order) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log('sectionByOrder : ', sectionByOrder);
    // ----------------------------------------------
    sectionByOrder.forEach((s) => {
      let isValidate = s.Validate(forSubmit, !hasError);
      //console.log(s.Title, " | isValidate : ", isValidate);
      hasError = hasError || !isValidate;
    });
    // ----------------------------------------------
    this.isValidateError = hasError;
    // ----------------------------------------------
    if (hasError) {
      //this.whileSaving = false;
    } else {
      //console.log('----------------- OK ----------------');
      // console.log(this.repo.currentDocument);
    }

    //console.log('hasError : ', hasError);

    return !hasError;
  }
  //--------------------------------------------------------
  public resetModalState() {
    this.whileSaving = false;
    this.isSaveSubmit = false;
    this.isSaveSuccess = false;
    this.isSaveError = false;
    this.isValidateError = false;
  }
  //--------------------------------------------------------
  public get IsRequest_Enter() {
    let result =
      this.requestDocumentType == RequestDocumentType.EnterWithOwner ||
      this.requestDocumentType == RequestDocumentType.Renewal_Enter;
    // ||      this.requestDocumentType == RequestDocumentType.Renewal_EnterWithOwner

    // if(result) console.log("IsRequest_Enter : ", result);

    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_Import() {
    let result =
      this.requestDocumentType == RequestDocumentType.ImportWithOwner ||
      this.requestDocumentType == RequestDocumentType.Renewal_Import;
    // ||      this.requestDocumentType == RequestDocumentType.Renewal_ImportWithOwner
    // if(result) console.log("IsRequest_Import : ", result);

    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_Production() {
    // console.log("IsRequest_Production : ", this.requestDocumentType);

    let result =
      this.requestDocumentType == RequestDocumentType.ProductionWithOwner ||
      this.requestDocumentType == RequestDocumentType.Renewal_Production;
    // || this.requestDocumentType == RequestDocumentType.Renewal_ProductionWithOwner
    // || this.requestDocumentType == RequestDocumentType.Substitute_Production

    // if(result) console.log("IsRequest_Production : ", result);

    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_Owner() {
    let result =
      this.requestDocumentType == RequestDocumentType.Owner ||
      this.requestDocumentType == RequestDocumentType.Renewal_Owner ||
      this.requestDocumentType == RequestDocumentType.Substitute_Owner;

    // if(result) console.log("IsRequest_Owner : ", result);

    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_OwnerOnly() {
    let result =
      this.requestDocumentType == RequestDocumentType.Owner ||
      this.requestDocumentType == RequestDocumentType.Renewal_Owner;

    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_Renewal() {
    let docType: number = this.repo.currentRequestType;
    let result = docType >= 10000 && docType < 20000;

    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_Substitute() {
    let result =
      this.requestDocumentType == RequestDocumentType.Substitute ||
      this.requestDocumentType == RequestDocumentType.Substitute_CrossBorder ||
      this.requestDocumentType == RequestDocumentType.Substitute_Enter ||
      this.requestDocumentType == RequestDocumentType.Substitute_Export ||
      this.requestDocumentType ==
        RequestDocumentType.Substitute_ExportSpecial ||
      this.requestDocumentType == RequestDocumentType.Substitute_Import ||
      // this.requestDocumentType == RequestDocumentType.Substitute_Owner ||
      this.requestDocumentType == RequestDocumentType.Substitute_Production ||
      this.requestDocumentType == RequestDocumentType.Substitute_SendSample;

    // if(result) console.log("IsRequest_Substitute : ", result);
    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_GroupOfExport(): boolean {
    return (
      this.IsRequest_CrossBorder ||
      this.IsRequest_Export ||
      this.IsRequest_ExportSpecial ||
      this.IsRequest_Sample ||
      this.IsRequest_Artty ||
      this.IsRequest_Destroy_Armament
    );
  }
  //--------------------------------------------------------
  public get IsRequest_Sample() {
    let result =
      this.requestDocumentType == RequestDocumentType.SendSample ||
      this.requestDocumentType == RequestDocumentType.Renewal_SendSample;
    // ||      this.requestDocumentType == RequestDocumentType.Renewal_SendSampleWithOwner

    // if(result) console.log("IsRequest_Sample : ", result);
    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_Export() {
    let result =
      this.requestDocumentType == RequestDocumentType.Export ||
      this.requestDocumentType == RequestDocumentType.Renewal_Export;
    // ||      this.requestDocumentType == RequestDocumentType.Renewal_ExportWithOwner

    // if(result) console.log("IsRequest_Export: ", result);
    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_ExportSpecial() {
    let result =
      this.requestDocumentType == RequestDocumentType.ExportSpecial ||
      this.requestDocumentType == RequestDocumentType.Renewal_ExportSpecial;
    // ||      this.requestDocumentType == RequestDocumentType.Renewal_ExportSpecialWithOwner

    // if(result) console.log("IsRequest_ExportSpecial : ", result);
    return result;
  }
  //--------------------------------------------------------
  public get IsRequest_CrossBorder() {
    let result =
      this.requestDocumentType == RequestDocumentType.CrossBorder ||
      this.requestDocumentType == RequestDocumentType.Renewal_CrossBorder;
    // ||      this.requestDocumentType == RequestDocumentType.Renewal_CrossBorderWithOwner

    // if(result) console.log("IsRequest_CrossBorder : ", result);
    return result;
  }

  public get IsRequest_Artty() {
    let result = this.requestDocumentType == RequestDocumentType.Artty;
    return result;
  }

  public get IsRequest_Destroy_Armament() {
    let result =
      this.requestDocumentType == RequestDocumentType.DestroyArmament;
    return result;
  }

  //--------------------------------------------------------
  //--------------------------------------------------------
  public get IsRenewal(): boolean {
    // return (this.requestDocumentType >= RequestDocumentType.Renewal) && (this.requestDocumentType <= RequestDocumentType.Renewal_CrossBorderWithOwner);
    let result =
      this.requestDocumentType >= RequestDocumentType.Renewal &&
      this.requestDocumentType <= RequestDocumentType.Renewal_CrossBorder;

    // if(result) console.log("IsRenewal", result);
    return result;
  }
  //--------------------------------------------------------
  public get IsSubstitute(): boolean {
    // return (this.requestDocumentType >= RequestDocumentType.Substitute) && (this.requestDocumentType <= RequestDocumentType.Substitute_CrossBorderWithOwner);
    let result =
      this.requestDocumentType >= RequestDocumentType.Substitute &&
      this.requestDocumentType <= RequestDocumentType.Substitute_CrossBorder;

    // if(result) console.log("IsSubstitute", result);
    return result;
  }
  //--------------------------------------------------------
  // public get IsShowSectionReference():boolean{
  //   // return !this.IsRenewal; // || this.IsSubstitute;
  //   return this.IsRequest_Owner;
  // }
  //--------------------------------------------------------
  //--------------------------------------------------------
  public get isLock(): boolean {
    return this.repo.isLock;
  }
  //--------------------------------------------------------
  public get isDocumentSubmited(): boolean {
    return (
      this.repo.currentDocument.SUBMIT_STATUS == 1 &&
      this.repo.currentDocument.STATUS == 0
    );
  }
  //--------------------------------------------------------
  public rejectSubmit() {
    this.app.ShowWaitingDialog();

    this.repo
      .rejectSubmit()
      .then((result: any) => {})
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        this.app.CloseWaitingDialog();
      });
  }
  //--------------------------------------------------------
  public logDoc() {
    console.log(this.repo.currentDocument);
  }
  //--------------------------------------------------------
  public swabCommandPalate() {
    this.isShowCommandPalate = !this.isShowCommandPalate;
  }
  //--------------------------------------------------------
  public showHelp() {}
  //--------------------------------------------------------
  //--------------------------------------------------------
  public get hasLastOfficerReject(): boolean {
    return (
      this.repo.currentDocument.SubmitInfoHistory &&
      this.repo.currentDocument.SubmitInfoHistory.length > 0 &&
      this.repo.currentDocument.SubmitInfoHistory[0].OFFICER_COMMENT_DATE !=
        null
    );
  }
  //--------------------------------------------------------
  public get SubmitInfoLength(): number {
    return this.repo.currentDocument.SubmitInfoHistory.length;
  }
  //--------------------------------------------------------
  public get LastOfficerRejectInfo(): SubmitInfo {
    if (this.hasLastOfficerReject) {
      return this.repo.currentDocument.SubmitInfoHistory[0];
    } else {
      return null;
    }
  }
  //--------------------------------------------------------
  //--------------------------------------------------------
  public showDialogtraderDocument(forceRequest: boolean = false) {
    this.popupTraderDocument.showDialogtraderDocument();
    // this.popupTraderDocument.openDialog(()=>{

    // })
  }
  //--------------------------------------------------------
  //--------------------------------------------------------
  private _errorMessage: string = "";
  public get errorMessage(): string {
    return this._errorMessage;
  }
  //--------------------------------------------------------
}
