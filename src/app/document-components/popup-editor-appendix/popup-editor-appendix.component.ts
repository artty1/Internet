import { Component, OnInit } from '@angular/core';

import { baseModalDialog, DialogResult } from '../../shared/base/base-modal-dialog';
import { UnitService } from '../../shared/services/lookup/unit.service';
import { Unit } from '../../shared/models/lookup';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { Appendix } from '../../shared/models/request-document';

@Component({
  selector: 'cdss-popup-editor-appendix',
  templateUrl: './popup-editor-appendix.component.html',
  styleUrls: ['./popup-editor-appendix.component.css']
})
export class PopupEditorAppendix extends baseModalDialog implements OnInit {

  public appendix: Appendix;

  private is_item_validate: boolean = false;

  constructor(protected app: ApplicationContext, protected repoUnit: UnitService) {
    super();

    this.appendix = new Appendix();
  }
  // ------------------------------------------------
  ngOnInit() {
  }
  // ------------------------------------------------
  public get IsValidate(): boolean {
    return this.is_item_validate;
  }
  // ------------------------------------------------
  public Validate(appendix: Appendix):boolean {
    return this.validate(appendix, false);
  }
  // ------------------------------------------------
  private validate(appendix:Appendix, is_myself_validation:boolean=false): boolean {
    let hasError: boolean = false;

    if (appendix.PRODUCT_NAME == null || appendix.PRODUCT_NAME.trim().length == 0) {
      hasError = true;

      if(is_myself_validation) this.app.setValidateControl('txtAppendixEditor_Name', false);
    }

    if (appendix.QUANTITY == null || appendix.QUANTITY == 0) {
      hasError = true;
      if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_QTY', false);
    }
    if (appendix.QUANTITY_UNIT_ID == null || appendix.QUANTITY_UNIT_ID == 0) {
      hasError = true;
      if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_QTYUnit', false);
    }

    //if (appendix.WEIGHT == null || appendix.WEIGHT == 0) {
    //  hasError = true;
    //  if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_Weight', false);
    //}
    //if (appendix.WEIGHT_UNIT_ID == null || appendix.WEIGHT_UNIT_ID == 0) {
    //  hasError = true;
    //  if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_WeightUnit', false);
    //}
    if (appendix.WEIGHT_UNIT_ID == -1) {
      if (appendix.WEIGHT > 0) {
        hasError = true;
        if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_Weight', false);
      }
    } else if (appendix.WEIGHT_UNIT_ID == 0) {
      hasError = true;
      if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_WeightUnit', false);

      if (appendix.WEIGHT == 0) {
        hasError = true;
        if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_Weight', false);
      }

    } else {  //appendix.WEIGHT_UNIT_ID > 0
      if (appendix.WEIGHT == 0) {
        hasError = true;
        if (is_myself_validation) this.app.setValidateControl('txtAppendixEditor_Weight', false);
      }
    }

    // ---------------------------------
    if (is_myself_validation) this.is_item_validate = !hasError;
    // ---------------------------------
    return !hasError;
  }
  // ------------------------------------------------
  public checkUnitOfWeight() {

    console.log('this.appendix.WEIGHT_UNIT_ID :', this.appendix.WEIGHT_UNIT_ID);

    if (this.appendix.WEIGHT_UNIT_ID == -1) {
      this.appendix.WEIGHT = 0;
      this.clearValidate('txtAppendixEditor_Weight');
    }

    this.clearValidate('txtAppendixEditor_WeightUnit');
  }

  public clearValidate(elID) {
    this.app.setValidateControl(elID, true);
  }
  // ------------------------------------------------
  public saveAppendix() {

    if (this.validate(this.appendix, true)) {
      //if (this.callbackClose != null) this.callbackClose(this.buildResult(true));
      this.innerClose(true);
    }

    //this.innerClose(true);
  }
  // ------------------------------------------------
  public get WeightList(): Array<Unit> {
    return this.repoUnit.ListWeight;
  }
  // ------------------------------------------------
  public get UnitList(): Array<Unit> {
    return this.repoUnit.ListUnit;
  }

  // ------------------------------------------------
  private clearInvalidAll() {
    this.clearValidate('txtAppendixEditor_Name');
    this.clearValidate('txtAppendixEditor_QTY');
    this.clearValidate('txtAppendixEditor_QTYUnit');
    this.clearValidate('txtAppendixEditor_Weight');
    this.clearValidate('txtAppendixEditor_WeightUnit');
  }
  // ------------------------------------------------
  public openForEdit(data: Appendix, callback:Function=null) {
    this.appendix = JSON.parse(JSON.stringify(data));

    //this.clearInvalidAll();
    this.validate(this.appendix, true);
    this.openDialog(callback);
  }
  // ------------------------------------------------
  public openForNew(productName: string, brand: string = "NO BRAND", series: string = "", callback: Function=null) {
    this.appendix = new Appendix();
    this.appendix.ID = 0;
    this.appendix.PRODUCT_BRAND_NAME = brand;
    this.appendix.PRODUCT_NAME = productName;
    this.appendix.PRODUCT_SERIES = series;

    this.clearInvalidAll();
    this.openDialog(callback);
  }
// ------------------------------------------------
}
