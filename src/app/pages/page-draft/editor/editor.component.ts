import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ApplicationContext } from '../../../application-context';
import { RequestDocumentService } from '../../../shared/services/request-document.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { RequestDocumentType } from '../../../shared/enums/request-type.enum';
import { WaitingDialog } from '../../../components/waiting-dialog/waiting-dialog.component';
import { DialogResult } from '../../../shared/base/base-modal-dialog';
//import { EventResult } from '../../../shared/models/result';
//import { DialogComponent } from '../../../components/dialog/dialog.component';


@Component({
  selector: 'cdss-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  public draft_id: number;
  private subParams: any;

  private popupLoading: WaitingDialog;
  private popupError: WaitingDialog;
  public errorMessage: string;

  constructor(private app: ApplicationContext, private route: ActivatedRoute, private router: Router, private repo: RequestDocumentService) {
    //console.log('PARAMS : ', this.route.params);
    this.app.scrollToTop();
  }

  ngOnInit() {

    this.subParams =  this.route.params.subscribe(params => {
      this.draft_id = params.id;
      //this.loadDraftDocument();
    });

  }
  // -------------------------------------------
  ngOnDestroy() {
    this.subParams.unsubscribe();
  }
  // -------------------------------------------
  @Input()
  public get requestType(): RequestDocumentType {
    return this.repo.currentRequestType;
  }
  // -------------------------------------------
  private loadDraftDocument() {
    this.repo.loadDraftDocument(this.draft_id, (is_ok, message) => {
      //console.log('draft data : ', this.repo.currentDocument);
      this.popupLoading.closeDialog();
      this.errorMessage = message;

      if (is_ok != true) {

        this.popupError.openDialog();

        setTimeout(() => {
          this.popupError.closeDialog();
          this.app.gotoDraftDashboard();
        }, 2000);

      } else {

      }

    });
  }
  // -----------------------------------------
  public get isLoading(): boolean {
    return this.repo.isLoading;
  }
  // -----------------------------------------
  public initWaitingDialog(arg: DialogResult) {
    
    if (arg.sender.tag == "draft-loading") {
      this.popupLoading = arg.sender;
      // this.popupLoading.openDialog();
    } else if (arg.sender.tag == "error-loading") {
      this.popupError = arg.sender;
    }

  }
  // -----------------------------------------

}
