import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, ReferenceDocument } from '../../shared/models/request-document';
import { DialogResult } from '../../shared/base/base-modal-dialog';
import { LicenseDocumentForUIList } from '../../shared/models/documentForUIList';
import { PopupSearchRefLicense } from '../popup-search-ref-license/popup-search-ref-license.component';

@Component({
  selector: 'cdss-section-domestic-ordering',
  templateUrl: './section-domestic-ordering.component.html',
  styleUrls: ['./section-domestic-ordering.component.css']
})

export class SectionDomesticOrderingComponent extends BaseSection implements OnInit {

  private popupOfLicense: PopupSearchRefLicense;
  private __tempRemainQTY: number = 0;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService) {
    super(app, repo);
    this.title = 'การสั่งซื้อในประเทศ';
  }
  //-------------------------------------------
  ngOnInit() {

  }
  // ------------------------------------------------------
  public get RefDoc(): ReferenceDocument {
    return this.repo.currentDocument.ReferenceDocument;
  }

  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  //--------------------------------------------------------
  public initialPopup(arg: DialogResult) {
    this.popupOfLicense = arg.sender;
  }
  // ----------------------------------------
  public searchReferenceLicense() {

    this.popupOfLicense.openForSearchLicense((result: DialogResult) => {
      if (result.data != null) {

        let license: LicenseDocumentForUIList = result.data;

        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_NO = license.license_no;

        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_ISSUE_DATE = license.license_issue_date;
        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_EXPIRY_DATE = license.license_expire_date;

        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_QTY = license.qty;
        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_QTY_UNIT_ID = license.qty_unit_id;

        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_WT = license.weight;
        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_WT_UNIT_ID = license.weight;

        this.repo.currentDocument.ReferenceDocument.REF_LICENSE_FORM_ID = license.form_id;

        this.__tempRemainQTY = license.rest_of_qty;

      }else{
        this.__tempRemainQTY = 0;
      }
    });
    // ----------------------------------------
  }
  public calRemain(){
    this.RefDoc.REMAIN_QUANTITY = this.__tempRemainQTY - this.RefDoc.ACTUAL_QUANTITY;
  }

  public get AvailableQuantity(): number {
    // todo !!!
    return this.RefDoc.REMAIN_QUANTITY;
  }
  // ----------------------------------------
}
