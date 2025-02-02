import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationContext } from 'src/app/application-context';
import { baseModalDialog } from 'src/app/shared/base/base-modal-dialog';
import { ServerResult } from 'src/app/shared/models/result';
import { TraderDocumentFromELicensing, TraderDocumentAttachment } from 'src/app/shared/models/trader-document';
import { TraderInformationService } from 'src/app/shared/services/_trader-information.service';
// import { ELicensingService } from 'src/app/shared/services/elicensing.service';

@Component({
  selector: 'cdss-popup-trader-document',
  templateUrl: './popup-trader-document.component.html',
  styleUrls: ['./popup-trader-document.component.css']
})

export class PopupTraderDocument extends baseModalDialog implements OnInit {

  // public traderDocumentAttachments: Array<TraderDocumentFromELicensing> = null;
  // public currentTraderDocumentAttachment: TraderDocumentFromELicensing = null;
  public currentTraderDocumentAttachment: TraderDocumentFromELicensing = new TraderDocumentFromELicensing();


  constructor(
    protected app:ApplicationContext,

    protected trader: TraderInformationService
  ) {

    super();

  }

  ngOnInit() {

  }

  public closeDialogtraderDocument(){
    this.closeDialog();
  }
  //--------------------------------------------------------
  public get traderDocumentAttachments():Array<TraderDocumentFromELicensing>{
    return this.trader.traderDocumentAttachments;
  }

  public get isShowDialogtraderDocument(){
    return this.trader.traderDocumentAttachments;
  }
  //--------------------------------------------------------------
  public showDialogtraderDocument(forceRequest: boolean = false){

    this.trader.loadDocumentAttactmentOfTrader(()=>{
      this.openDialog();
    });

    // if(this.traderDocumentAttachments && !forceRequest){
    //   this.openDialog();
    //   return;
    // }
    //--------------------------------------------------------------
    // this.app.ShowWaitingDialog();

    // this.traderDocumentAttachments = null;

    // this.eLicensingService
    //   .loadDocumentAttactment()
    //   .then((result: ServerResult)=>{

    //     this.traderDocumentAttachments = <Array<TraderDocumentFromELicensing>> result.data;

    //     const docResult = <Array<TraderDocumentFromELicensing>> result.data;
    //     const hasData:boolean = docResult.length>0;

    //     this.app.CloseWaitingDialog();

    //     if(!hasData){
    //       this.traderDocumentAttachments = null;
    //       this.currentTraderDocumentAttachment = null;
    //       this.app.ShowWaitingDialog("data not found.");

    //     }else{
    //       this.traderDocumentAttachments = docResult;
    //       this.currentTraderDocumentAttachment = this.traderDocumentAttachments[0];

    //       setTimeout(() => {
    //         this.openDialog();
    //       }, 50);

    //     }

    //   })
    //   .catch((err: ServerResult)=>{
    //     console.log(err);
    //     this.app.CloseWaitingDialog();
    //   });

  }
  //--------------------------------------------------------
  public focusToDocument(item: TraderDocumentFromELicensing){
    console.log('focusToDocument: ', item);
    this.currentTraderDocumentAttachment = item;
  }
  //--------------------------------------------------------
  public viewToDocument(item: TraderDocumentAttachment){
    // console.log('viewToDocument : ', item);

    // this.app.ShowWaitingDialog();
    this.trader.loadDocumentAttactmentOfTrader((err: any)=>{
      // this.app.CloseWaitingDialog();
      if(err){
        item.ui_exception = err.message[0];
      }else{

      }

    });
    // this.eLicensingService
    //   .viewDocument(item.file_token, item.file_fullname)
    //   .then((resp: ServerResult)=>{
    //     this.app.CloseWaitingDialog();
    //   })
    //   .catch((error: ServerResult)=>{
    //     this.app.CloseWaitingDialog();
    //     item.ui_exception = error.message[0];
    //   });
  }
  //--------------------------------------------------------

  //--------------------------------------------------------
}
