import { Component, OnInit } from '@angular/core';
import { BaseSection } from './../../shared/base/base-section';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { RequestDocument, ReferenceDocument } from '../../shared/models/request-document';
// import { trader_01 } from '../../shared/data/mockup-trader';

@Component({
  selector: 'cdss-section-adjust-qty',
  templateUrl: './section-adjust-qty.component.html',
  styleUrls: ['./section-adjust-qty.component.css']
})
export class SectionAdjustQtyComponent extends BaseSection implements OnInit {

  public RefDoc: ReferenceDocument;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService) {
    super(app, repo);

    this.RefDoc = this.repo.currentDocument.ReferenceDocument;

    this.title = 'เพิ่ม/ลดยอดขออนุญาตยุทธภัณฑ์จากเดิม';
    //this.checkRequestType(this.repo.currentDocument);


  }

  ngOnInit() {
  }

  //--------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    // ---------- set Default ---------------------------------------
    if (this.RefDoc.REF_ADJUST_QTY == null) this.RefDoc.REF_ADJUST_QTY = 0;
    // -------------------------------------------------
    if (!forSubmit) return true;
    // -------------------------------------------------
    let result: boolean = true;
    let doc = this.repo.currentDocument;

    if (doc.ReferenceDocument.REF_ADJUST_QTY > 0 &&
        (doc.ReferenceDocument.REF_ADJUST_REASON == null || doc.ReferenceDocument.REF_ADJUST_REASON.trim().length == 0)
    ) {
      result = false;
      this.app.setValidateControl("txtAdjustReason", false);
      //if (isFocusToField) this.app.scrollToElement('txtAdjustReason');
      if (isFocusToField) this.app.scrollToElement('div-section-adjust-qty');

    }
    // -------------------------------------------------
    return result;

  }
  // ----------------------------------------
 
  // ----------------------------------------
  public changeAdjustReason() {
    this.app.setValidateControl('txtAdjustReason', true);
  }
  // ----------------------------------------
  public changeAdjustQTY() {
    if(this.RefDoc.REF_ADJUST_QTY==0) this.app.setValidateControl('txtAdjustReason', true);
  }
  // ----------------------------------------

}
