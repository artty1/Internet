import { Component, OnInit, Input, Output } from '@angular/core';
import { ApplicationContext } from '../../../application-context';
import { Router, Route, ActivatedRoute } from '@angular/router';


import { RequestDocumentType } from './../../../shared/enums/request-type.enum';
import { RequestDocumentService } from '../../../shared/services/request-document.service';

@Component({
  selector: 'cdss-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @Input() requestDocumentType: RequestDocumentType;
  //public requestType: RequestType = RequestType.NONE;

  public referTo: number;

  //reqType
  //referToLicense
  //referToRequest
  //referToDraft
  //referToReject

  //--------------------------------------------------
  constructor(private app: ApplicationContext, private route: ActivatedRoute, private router: Router, private repo: RequestDocumentService) {

    this.app.scrollToTop();
    
    if (this.route.snapshot.data.reqType != undefined) {
      this.requestDocumentType = this.route.snapshot.data.reqType;
      //console.log('this.requestDocumentType : ', this.requestDocumentType);

      if (this.requestDocumentType != RequestDocumentType.Renewal && this.requestDocumentType != RequestDocumentType.Substitute) {
        this.repo.createNewRequest(this.requestDocumentType);            
      }
      
    } else {
      this.requestDocumentType = RequestDocumentType.NONE;
    }
    //----------------------------------------------------
    //if (this.route.snapshot.data.referToLicense != undefined) {
    //  this.referTo = this.route.snapshot.data.referToLicense;
    //  console.log('referToLicense : ', this.referTo);
    //  this.repo.loadReferenceLicense(this.referTo);
    //  this.requestType = RequestType.NONE;
    //}
    ////----------------------------------------------------
    //if (this.route.snapshot.data.referToReject != undefined) {
    //  this.referTo = this.route.snapshot.data.referToReject;
    //  console.log('referToReject: ', this.referTo);
    //  this.repo.loadRejectDocument(this.referTo);
    //  this.requestType = RequestType.NONE;
    //}
    ////----------------------------------------------------
    //if (this.route.snapshot.data.referToRequest != undefined) {
    //  this.referTo = this.route.snapshot.data.referToRequest;
    //  console.log('referToRequest : ', this.referTo);
    //  this.repo.loadReferenceRequest(this.referTo);
    //  this.requestType = RequestType.NONE;
    //}
    //----------------------------------------------------


  }
  // -------------------------------------------
  ngOnInit() {

  }
  // -------------------------------------------
  //public get isLoadingReference():boolean {
  //  return this.repo.isLoading;
  //}
  // -------------------------------------------

}
