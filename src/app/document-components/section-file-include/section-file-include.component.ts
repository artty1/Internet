import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { BaseSection } from "../../shared/base/base-section";
import { ApplicationContext } from "../../application-context";
import { RequestDocumentService } from "../../shared/services/request-document.service";
//import { FileInclude } from '../../shared/models/request-document';

import { UploadFileType } from "./../../shared/enums/file-type";
import { ImageDialogComponent } from "../../components/image-dialog/image-dialog.component";
import { EventResult, ServerResult } from "../../shared/models/result";
import { HttpClient } from "@angular/common/http";
import { PopupFileUploadComponent } from "../popup-file-upload/popup-file-upload.component";
import { UploadService } from "./upload.service";

import { RequestFileInclude, RequestFileItem } from "./models";
import { ToMonthPeriodPipe } from "src/app/shared/pipes/to-month-period.pipe";
import { ConfirmDialog } from "src/app/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "cdss-section-file-include",
  templateUrl: "./section-file-include.component.html",
  styleUrls: ["./section-file-include.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SectionFileInclude extends BaseSection implements OnInit {
  @ViewChild("dialogError", { static: true })
  private dialogError: ConfirmDialog;

  private uploadService: UploadService;

  constructor(
    public app: ApplicationContext,
    public repo: RequestDocumentService,
    public http: HttpClient
  ) {
    super(app, repo);
    this.title = "รายการเอกสารแนบ";

    console.log("this.title", this.title);

    if (!this.repo.currentDocument.fileInclude) {
      this.repo.currentDocument.fileInclude = new RequestFileInclude();
    }

    // this.uploadService = new UploadService(this.app, this.http, this.repo);
    this.uploadService = new UploadService(this.app, this.http);
    this.registerOnAfterViewInit(this.initWithUploadService);
  }
  // ---------------------------------------------
  private initWithUploadService() {
    this.uploadService
      .loadIncludeFileList(this.repo.currentDocument)
      .then((result: RequestFileInclude) => {
        // this.repo.currentDocument.fileInclude = result;
        // console.log('load file OK : ', result);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  // ---------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ---------------------------------------------
  ngOnInit() {}
  // ---------------------------------------------
  public get fileIncludeList(): RequestFileInclude {
    return this.repo.currentDocument.fileInclude;
  }
  // ---------------------------------------------
  public get Footer(): string {
    let result = "ยังไม่มีเอกสารแนบ";
    let fileCount = this.repo.currentDocument.fileInclude.fileItems.length;

    if (fileCount > 0) {
      result = "เอกสารแนบทั้งหมด " + fileCount + " ไฟล์";
    }

    // if(this.uploadErrorMessage.trim().length>0){
    //   result = this.uploadErrorMessage + result;
    // }

    return result;
  }
  // ---------------------------------------------
  public swapRemoveItem(item: RequestFileItem) {
    item.for_delete = !item.for_delete;
  }
  // ---------------------------------------------
  public viewItem(item: RequestFileItem) {
    this.app.ShowWaitingDialog();
    this.uploadService.downloadFile(item, (isOK: boolean, err: any) => {
      this.app.CloseWaitingDialog();

      if (!isOK) {
        this._uploadErrorMessage = err.status + " " + err.statusText;
        this.dialogError.openDialog();
      }
    });
  }
  // ---------------------------------------------
  public editItemName(item: RequestFileItem) {}
  // ---------------------------------------------
  // ---------------------------------------------
  public uploadDone(result: ServerResult) {
    const fResult: Array<any> = result.data;
    const fResultOK = fResult.filter((item) => item.is_success == true);
    const fResultError = fResult.filter((item) => item.is_success != true);

    // console.clear();

    const fList = new Array<RequestFileItem>();

    fResultOK.forEach((item: any) => {
      const f = new RequestFileItem();
      f.id = 0;
      f.for_delete = false;
      f.file_extension = "pdf";
      f.name = item.fileName;
      f.token = item.result.data;

      f.setItemFroServerResult();

      fList.push(f);
    });

    this.repo.currentDocument.fileInclude.fileItems.push(...fList);

    this.app.CloseWaitingDialog();

    if (fResultError.length > 0) {
      const message = fResultError
        .map((item: any) => {
          return (
            '<div class="div-error">' +
            '     <div class="div-error-title">' +
            item.fileName +
            "</div>" +
            '     <div class="div-error-description">' +
            item.result.message +
            "</div>" +
            "   </div>"
          );
        })
        .join("");

      this._uploadErrorMessage =
        '<div class="div-error-header">พบข้อผิดพลาดในการ upload บาง file, กรุณาลองอีกครั้ง</div>' +
        message;

      setTimeout(() => {
        this.dialogError.openDialog();
      }, 100);
    }
  }
  // ---------------------------------------------
  private _uploadErrorMessage: string = "";
  public get uploadErrorMessage(): string {
    return this._uploadErrorMessage;
  }
  public uploadError(result: ServerResult) {
    // console.log('-------------------------------');
    console.error("uploadError: ", result);
    // this.uploadErrorMessage = "";
    // this.app.CloseWaitingDialogWithError(result);
    // console.log('-------------------------------');
    this._uploadErrorMessage = result.listAllMessage;
    this.dialogError.openDialog();
  }
  // ---------------------------------------------
  public beginUpload(result: ServerResult) {
    // console.log('beginUpload : ', result);
    this.app.ShowWaitingDialog("กำลัง upload file เอกสาร...");
  }
  // ---------------------------------------------
  // ---------------------------------------------
}
