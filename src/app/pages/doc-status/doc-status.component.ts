import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { DocumentStatus } from '../../shared/enums/document-status.enum';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { DocumentListService } from '../../shared/services/document-list.service';
import { RequestDocumentType } from '../../shared/enums/request-type.enum';
import { RequestDocumentForUIList } from '../../shared/models/documentForUIList';
import { PrintDocumentService } from 'src/app/shared/services/print-document.service';
import { RequestDocumentService } from 'src/app/shared/services/request-document.service';
import { WaitingDialog } from 'src/app/components/waiting-dialog/waiting-dialog.component';
import { DatagridPaginationComponent } from 'src/app/components/datagrid-pagination/datagrid-pagination.component';

@Component({
  selector: 'cdss-doc-status',
  templateUrl: './doc-status.component.html',
  styleUrls: ['./doc-status.component.css']
})
export class DocStatusComponent implements OnInit, AfterViewInit {

  @ViewChild("pg", { static: true })  paging:DatagridPaginationComponent
  @ViewChild("waitingDialog", { static: true }) waitingDialog:WaitingDialog;

  private forStatus: DocumentStatus;

  @Input() showViewCommand: boolean;
  @Input() showEditCommand: boolean;
  @Input() showDeleteCommand: boolean;

  @Input() showCheckbox: boolean;

  constructor(private app: ApplicationContext, private route: ActivatedRoute, private repo: DocumentListService, private printService: PrintDocumentService, private repoRequest: RequestDocumentService) {

    this.app.scrollToTop();

    this.forStatus = this.route.snapshot.data.status;

    this.showViewCommand = true;
    this.showEditCommand = false;
    this.showDeleteCommand = false;

    this.showCheckbox = true;

    // if (this.app.requestUpdateSubmitList) {
    //   this.app.requestUpdateSubmitList = false;
    //   this.repo.refresh();
    // }


  }
  //------------------------------------------
  ngAfterViewInit(){

    if (this.app.requestUpdateSubmitList) {
      this.app.requestUpdateSubmitList = false;
      this.repo.refresh();
    }

    setTimeout(()=>{
      this.paging.Datasource = this.repo.getDocumentByStatus(this.forStatus);
    }, 50);

  }
  //------------------------------------------
  ngOnInit() {

  }
  //------------------------------------------
  public rejectSubmit(doc_id: number){

    this.repoRequest
    .rejectSubmitDcoumentID(doc_id)
    .then((result:any)=>{

    })
    .catch((err: any)=>{
      console.log(err);
    })
    .finally(()=>{
      this.app.CloseWaitingDialog();
    });
  }
  //------------------------------------------
  public printRequestDocument(doc_id: number) {
    this.printService.PrintRequestDocumentToPDF(doc_id);
  }
  //------------------------------------------
  // public viewRequestDocument(doc_id: number) {
  //   // this.printService.PrintRequestDocumentToPDF(doc_id);
  // }
  //------------------------------------------
  public get IsDocumentAccepted():boolean{
    return (
      this.IsStatusProcess || this.IsStatusApprove
    );
  }
  //------------------------------------------
  public get tdCount():number{

    if(this.IsDocumentAccepted){
      return 12;
    }else{
      return 8;
    }
  }
  //------------------------------------------
  public get status(): string {

    let result = "";

    switch (this.forStatus) {
      case DocumentStatus.Submited: result="คำขอที่ยื่นแล้ว"; break;
      case DocumentStatus.Accepted: result ="คำขอที่รับแล้ว"; break;
      case DocumentStatus.RejectToTrader: result ="คำขอที่ถูกปฏิเสธ"; break;
      case DocumentStatus.Inform: result ="กำลังดำเนินการ"; break;
      case DocumentStatus.Approved: result ="อนุมัติแล้ว"; break;
      case DocumentStatus.Refuse: result ="ถูกถอดเรื่อง"; break;
    }

    return result;

  }
  //------------------------------------------
  public get IsStatusSubmit(): boolean {
    return (this.forStatus == DocumentStatus.Submited);
  }
  //------------------------------------------
  public get IsStatusProcess(): boolean {
    return (
      this.forStatus == DocumentStatus.Accepted ||
      this.forStatus == DocumentStatus.Inform
      );
  }
  //------------------------------------------
  public get IsStatusApprove(): boolean {
    return this.forStatus == DocumentStatus.Approved;
  }
  //------------------------------------------
  public get IsStatusReject(): boolean {
    return (this.forStatus == DocumentStatus.RejectToTrader);
  }
  //------------------------------------------
  public get IsStatusCanPrint(): boolean {
    return (
      this.forStatus == DocumentStatus.Accepted ||
      this.forStatus == DocumentStatus.Inform ||
      this.forStatus == DocumentStatus.Approved ||
      this.forStatus == DocumentStatus.Complete
    );
  }
  //------------------------------------------
  public get IsStatusSubmited(): boolean {
    return (this.forStatus == DocumentStatus.Submited);
  }
  //------------------------------------------
  public get recordCount(): number {
    return this.paging.Datasource.length;
  }
  //------------------------------------------
  public get Datasource(): Array<RequestDocumentForUIList> {
    //return this.repo.getDocumentByStatus(this.forStatus);
    this.paging.Datasource = this.repo.getDocumentByStatus(this.forStatus);
    return this.paging.DataPage;
  }
  //------------------------------------------
  public get isLoading(): boolean {
    return this.repo.isLoading;
  }
  //------------------------------------------
  public get hideFooter(): boolean {
    return (
      (this.isLoading) ||
      (
        !this.isLoading &&
        this.recordCount == 0
      )
    );
  }
  //------------------------------------------
  public get noData(): boolean {
    // console.log(this.isLoading, this.recordCount);
    return (
      (!this.isLoading) &&
      (this.recordCount == 0)
    );
  }
  //------------------------------------------
  public get footerData(): string {
    let result = "";
    if (this.recordCount == 0) {
      result = "ไม่มีข้อมูล";
    } else {
      result = "จำนวนข้อมูล "+this.recordCount.toString()+" ข้อมูล";
    }
    return result;
  }
  //------------------------------------------

  //------------------------------------------
  //------------------------------------------
  public refreshData() {
    this.repo.refresh();
  }
  //------------------------------------------
  public activeCommandView(item): boolean {
    return false;
  }
  public activeCommandEdit(item): boolean {
    return false;
  }
  public activeCommandDelete(item): boolean {
    return false;
  }
  //------------------------------------------------
  public get hideCommandView():boolean {
    return !this.showViewCommand;
  }
  public get hideCommandEdit(): boolean {
    return !this.showEditCommand;
  }
  public hideCommandDelete(): boolean {
    return !this.showDeleteCommand;
  }
  //------------------------------------------------
  public actionCommandView(item) {
    //console.log('view : ', item);
  }
  //------------------------------------------------
  public actionCommandCopy(item) {
    this.waitingDialog.openDialog();
    this.repoRequest.copyDocument(item.id, (is_ok:boolean, message:string)=>{

      this.waitingDialog.closeAllDialog();

      if(is_ok){
        this.app.gotoDraft(item.id);
      }else{
        console.log("Error : ", message);
      }

    });
  }
  //------------------------------------------------
  public actionCommandEdit(item) {
    // console.log('edit : ', item);

    this.waitingDialog.openDialog();
    this.repoRequest.loadDraftDocument(item.id, (is_ok:boolean, message:string)=>{

      this.waitingDialog.closeAllDialog();

      if(is_ok){
        this.app.gotoDraft(item.id);
      }else{
        console.log("Error : ", message);
      }

    });

  }
  //------------------------------------------------
  public actionCommandDelete(item) {
    //console.log('delete : ', item);
  }
  //------------------------------------------------
  public get RowNo():number{
    return this.paging.RowNo;
  }
  //------------------------------------------------
}
