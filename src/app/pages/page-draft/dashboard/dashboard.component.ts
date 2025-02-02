import { Component, OnInit, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { ApplicationContext } from '../../../application-context';
import { DraftListService } from '../../../shared/services/draft-list.service';
import { RequestDocumentForUIList, DraftAvailable } from '../../../shared/models/documentForUIList';
//import { EventResult } from '../../../shared/models/result';
//import { DialogComponent } from '../../../components/dialog/dialog.component';


import { ConfirmDialog } from '../../../components/confirm-dialog/confirm-dialog.component';
import { DialogResult } from '../../../shared/base/base-modal-dialog';
import { DatagridPaginationComponent } from '../../../components/datagrid-pagination/datagrid-pagination.component';
import { RequestDocumentService } from 'src/app/shared/services/request-document.service';
import { MessageDialog } from 'src/app/components/message-dialog/message-dialog.component';


@Component({
  selector: 'cdss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("pg", { static: true }) private paging: DatagridPaginationComponent;

  // @ViewChild("dialogDelete", { static: true }) private confirmPopup: ConfirmDialog;
  @ViewChild("dialogDelete", { static: true }) private dialogDelete: ConfirmDialog;
  @ViewChild("dialogConfirm", { static: true }) private dialogConfirm: ConfirmDialog;
  @ViewChild("dialogMessage", { static: true }) private dialogMessage: MessageDialog;

  public MESSAGE_DELETE:string = 'คุณต้องการลบคำขอที่ร่างไว้ใช่หรือไม่';
  private MESSAGE_LICENSE_EXPIRE_NOACTION:string = 'ใบอนุญาตหมดอายุแล้ว ไม่สามารถสร้างคำขอใหม่ได้';
  private MESSAGE_LICENSE_EXPIRE:string = 'ใบอนุญาตหมดอายุแล้ว ไม่สามารถยื่นคำขอได้ ต้องการลบคำขอที่ร่างไว้ใช่หรือไม่';
  private MESSAGE_DUPLICATE_DRAFT_SUBMIT:string = 'มีการยื่นคำขอต่ออายุใบอนุญาตไปแล้ว ไม่สามารถยื่นคำขอได้อีก ต้องการลบคำขอที่ร่างไว้ใช่หรือไม่';

  public messageOfDialog:string = '';
  public messageOfConfirm: string = '';
  public deleteMessage:string= "";

  constructor(
    private app: ApplicationContext,
    private repo: DraftListService,
    private repoDraft: RequestDocumentService,
    private repoRequest: RequestDocumentService
  ) {

    this.app.scrollToTop();

    if (this.app.requestUpdateDraftList) {
      this.app.requestUpdateDraftList = false;
      this.repo.refresh();
    }
  }

  //--------------------------------------------------
  ngOnInit() {

  }
  ngAfterViewInit():void{
    setTimeout(()=>{
      this.paging.Datasource = this.repo.Datasource;
    }, 50);

  }
  //--------------------------------------------------
  public get isLoading(): boolean {
    return this.repo.isLoading;
  }
  //--------------------------------------------------
  public refreshData() {
    this.repo.refresh();
  }
  //--------------------------------------------------
  public get Datasource(): Array<RequestDocumentForUIList> {
    this.paging.Datasource = this.repo.Datasource;
    return this.paging.DataPage;
  }
  //--------------------------------------------------
  public get noData(): boolean {
    return !this.repo.isLoading && !this.repo.hasData;
  }
  //--------------------------------------------------
  public get footerData():string{
    return "จำนวน "+this.repo.Datasource.length+" ข้อมูล";
  }
  //--------------------------------------------------
  public actionCommandEdit(item:RequestDocumentForUIList) {

    // this.waitingDialog.openDialog();
    // -----------------------------------------------------
    // 20200415 confirm remove draft
    // if duplicate draft (of license) is submit
    // or license referrence of draft is expire
    if(item.draft_available == DraftAvailable.DuplicateDraftOfLicense_Submited){
      // this.deleteMessage = this.MESSAGE_DUPLICATE_DRAFT_SUBMIT;
      this.actionCommandDelete(item, this.MESSAGE_DUPLICATE_DRAFT_SUBMIT);
    }else if (item.draft_available == DraftAvailable.LicenseReferenceExpire){
      // this.deleteMessage = this.MESSAGE_LICENSE_EXPIRE;
      this.actionCommandDelete(item, this.MESSAGE_LICENSE_EXPIRE);
    }else {
      this.deleteMessage = "";
    // -----------------------------------------------------
    // -----------------------------------------------------
      this.repoDraft.loadDraftDocument(item.id, (is_ok:boolean, message)=>{

        if(is_ok){
          this.app.gotoDraft(item.id);
        }else{
          // wait for some solution resolve draft error
          // - another user in same trader submit or delete draft document
          // - data error
          console.log('loadDraftDocument in dashboard error : ', message);
        }

      });

    }
    // this.app.gotoDraft(item.id);
  }
  //--------------------------------------------------
  public actionCommandDelete(item:RequestDocumentForUIList, _deleteMessage:string='') {

    if(_deleteMessage.trim().length==0){
      this.deleteMessage = this.MESSAGE_DELETE;
    } else{
      this.deleteMessage = _deleteMessage;
    }

    let is_renew_or_substitue:boolean = false;  //item.request_type ==
    this.dialogDelete.openDialog((result:DialogResult) => {

      if (result.data==true) {

        this.repo.deleteDraft(item.id, (is_ok, message) => {
          if (is_ok) {
            this.refreshData();

            if(is_renew_or_substitue) this.app.requestUpdateLicenseList = true;

          } else {

          }

        });
      } else {
        //console.log('cancel delete');
      }
    });

  }
  //--------------------------------------------------
  // public paging_ready(arg:EventResult) {
  //   //console.log('pagination ready : ', arg.sender.tag);
  //   this.paging = arg.sender;
  // }
  //--------------------------------------------------
  public isCommandEnabled(item, action):boolean {
    return true;
  }
  //--------------------------------------------------
  public get hideCommandEdit(): boolean {
    return false;
  }
  //--------------------------------------------------
  public get hideCommandDelete(): boolean {
    return false;
  }
  //--------------------------------------------------
  // public get PagingCurrentPage(): number {
  //   return this.repo.CurrentPage;
  // }
  // //--------------------------------------------------
  // public get PagingPageCount(): number {
  //   return this.repo.PageCount;
  // }
  //--------------------------------------------------
  // public movePage(arg: EventResult) {
  //   let page_no: number = arg.data;
  //   this.repo.MovePageTo(page_no);
  // }
  //--------------------------------------------------
  //------------------------------------------------
  public get RowNo():number{
    return this.paging.RowNo;
  }
  //------------------------------------------------
  public draftStatusCSS(item:RequestDocumentForUIList):string{
    let result = '';
    if (item.draft_available != DraftAvailable.Available)
    {
      result = 'draft-unavailable';
    }

    return result;
  }

  //------------------------------------------------
  public actionCommandCopy(item) {

    // console.log('copy: ', item);

    if (item.draft_available == DraftAvailable.LicenseReferenceExpire){
      this.messageOfDialog = this.MESSAGE_LICENSE_EXPIRE_NOACTION;
      this.dialogMessage.openDialog();
      return;
    }

    // this.messageOfConfirm = "คุณต้องการ Copy ข้อมูลคำร้องหรือไม่";
    // this.dialogConfirm.openDialog((result: DialogResult)=>{
    //   console.log('dialog result: ', result);
    // });


    this.repoRequest.copyDocument(item.id, (is_ok:boolean, message:string)=>{

      if(is_ok){
        this.app.gotoDraft(item.id);
      }else{
        console.log("Error : ", message);
      }

    });
  }


}
