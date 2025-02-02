import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { ApplicationContext } from '../../../application-context';
import { RequestDocumentService } from '../../../shared/services/request-document.service';
import { RequestDocumentType } from '../../../shared/enums/request-type.enum';

@Component({
  selector: 'cdss-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})

// use other component immedialy ---- 20190809
export class RenewComponent implements OnInit {

  //public requestType: RequestDocumentType = RequestDocumentType.Renewal;
  public requestType: RequestDocumentType = RequestDocumentType.NONE;

    constructor(private app: ApplicationContext, private route: ActivatedRoute, private router: Router, private repo: RequestDocumentService) {

      //let params = this.route.snapshot.params;

      ////console.log('Params : ', params);

      //let renew_type = params.type;
      //let doc_id = params.id;

      //if (renew_type == null) {

      //} else if (renew_type.toLowerCase() == "license") {
      //  this.repo.loadReferenceLicense(doc_id);
      //} else if (renew_type.toLowerCase() == "request") {
      //  this.repo.loadReferenceRequest(doc_id);
      //} else {
      //  this.app.gotoHome();
      //}

  }
  //------------------------------------------------
  ngOnInit() {

  }
  //------------------------------------------------
  public get isLoadingReference():boolean {
    return this.repo.isLoading;
  }
  //------------------------------------------------

}
