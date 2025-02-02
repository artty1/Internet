import { Component, OnInit, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';

import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, UsageDetail } from '../../shared/models/request-document';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { ApplicationContext } from '../../application-context';
import { jQueryHelper } from '../../shared/helpers/jquery-helper';
import { Unit } from '../../shared/models/lookup';
import { UnitService } from '../../shared/services/lookup/unit.service';


@Component({
  selector: 'cdss-section-monthly-inventory',
  templateUrl: './section-monthly-inventory.component.html',
  styleUrls: ['./section-monthly-inventory.component.css']
})
export class SectionMonthlyInventoryComponent extends BaseSection implements OnInit, OnDestroy {

  private jh = new jQueryHelper();

  public INVENTORY_M1_ID = 'txtInvM1';
  public INVENTORY_M2_ID = 'txtInvM2';
  public INVENTORY_M3_ID = 'txtInvM3';
  public INVENTORY_ONHAND_ID = "txtInvOnHand";

  public CMD_INVENTORY_M1_ID = 'cmdInvM1';
  public CMD_INVENTORY_M2_ID = 'cmdInvM2';
  public CMD_INVENTORY_M3_ID = 'cmdInvM3';
  public CMD_INVENTORY_ONHAND_ID = "cmdInvOnHand";

  
  constructor(public app: ApplicationContext, public repo: RequestDocumentService, public repoUnit: UnitService) {
    super(app, repo);
    this.title = 'อัตราการใช้ จำหน่าย ในแต่ละเดือน และยอดคงเหลือ';


    this.registerOnAfterViewInit(this.initCalendar);

    if (!this.repoUnit.hasData) {
      this.repoUnit.refresh();
    }

    this.validateDataForInitial();

  }
  //-------------------------------------------
  ngOnInit() {

  }
  // ------------------------------------------------------
  private validateDataForInitial() {
    let usageList: Array<UsageDetail>;

    if (this.repo.currentDocument.ReferenceDocument.DetailsOfUsage == null) {
      this.repo.currentDocument.ReferenceDocument.DetailsOfUsage = new Array();
    }

    // console.log('Detail of Usage : ', this.repo.currentDocument.ReferenceDocument.DetailsOfUsage);
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    let hasError: boolean = false;
    // .....................................
    if (!this.IsUsageDetailNull(1)) {

      let usage = this.Monthly_01;
      console.log('usage 1 ', usage);
      if (usage.USE_DATE == null) {
        this.app.setValidateControl(this.INVENTORY_M1_ID, false);
        hasError = true;
      } else {
        this.clearValidate(this.INVENTORY_M1_ID);
      }

      if (usage.USE_QUANTITY == 0) {
        this.app.setValidateControl('txtInventory_M1_QTY', false);
        hasError = true;
      } else {
        this.clearValidate('txtInventory_M1_QTY');
      }
    }
    // .....................................
    if (!this.IsUsageDetailNull(2)) {

      let usage = this.Monthly_02;
      console.log('usage 2 ', usage);
      if (usage.USE_DATE == null) {
        this.app.setValidateControl(this.INVENTORY_M2_ID, false);
        hasError = true;
      } else {
        this.clearValidate(this.INVENTORY_M2_ID);
      }

      if (usage.USE_QUANTITY == 0) {
        this.app.setValidateControl('txtInventory_M2_QTY', false);
        hasError = true;
      } else {
        this.clearValidate('txtInventory_M2_QTY');
      }
    }
    // .....................................
    if (!this.IsUsageDetailNull(3)) {

      let usage = this.Monthly_03;
      console.log('usage 3 ', usage);
      if (usage.USE_DATE == null) {
        this.app.setValidateControl(this.INVENTORY_M3_ID, false);
        hasError = true;
      } else {
        this.clearValidate(this.INVENTORY_M3_ID);
      }

      if (usage.USE_QUANTITY == 0) {
        this.app.setValidateControl('txtInventory_M3_QTY', false);
        hasError = true;
      } else {
        this.clearValidate('txtInventory_M3_QTY');
      }
    }
    // .....................................
    if (!this.IsUsageDetailNull(4)) {

      let usage = this.OnHand;
      console.log('OnHand ', usage);
      if (usage.USE_DATE == null) {
        this.app.setValidateControl(this.INVENTORY_ONHAND_ID, false);
        hasError = true;
      } else {
        this.clearValidate(this.INVENTORY_ONHAND_ID);
      }

      if (usage.REMAIN_QUANTITY == 0) {
        this.app.setValidateControl('txtInventory_Onhand_QTY', false);
        hasError = true;
      } else {
        this.clearValidate('txtInventory_Onhand_QTY');
      }
    }
    // .....................................
    console.log('hasError : ', hasError);
    // ----------------------------------------------------
    //if (!hasError) this.packData();
    //console.log('DetailsOfUsage : ', this.repo.currentDocument.ReferenceDocument.DetailsOfUsage);
    //// ----------------------------------------------------    
    //if (forSubmit && this.repo.currentDocument.ReferenceDocument.DetailsOfUsage.length == 0) {
    //  hasError = true;
    //  this.app.setValidateControl("tbMonthlyInventory", false);
    //} else {
    //  this.clearValidate("tbMonthlyInventory");
    //}
    // ----------------------------------------------------
    if (hasError && isFocusToField) if (isFocusToField) this.app.scrollToElement("tbMonthlyInventory");
    // ----------------------------------------------------
    return !hasError;
  }
  // ------------------------------------------------------
  private packData() {
    let usages: Array<UsageDetail> = this.repo.currentDocument.ReferenceDocument.DetailsOfUsage.filter(item => {
      return !this.IsUsageDetailNull(item.ITEM_NO);
    });
    console.log('pack usages : ', usages);
    this.repo.currentDocument.ReferenceDocument.DetailsOfUsage = usages;
  }
  // ----------------------------------------
  ngOnDestroy(): void {
    this.jh.toDestroy_DatePicker(this.CMD_INVENTORY_M1_ID);
    this.jh.toDestroy_DatePicker(this.CMD_INVENTORY_M2_ID);
    this.jh.toDestroy_DatePicker(this.CMD_INVENTORY_M3_ID);
    this.jh.toDestroy_DatePicker(this.CMD_INVENTORY_ONHAND_ID);
  }
  // ----------------------------------------
  public initCalendar():void {    
    this.jh.toMonthPicker(this.CMD_INVENTORY_M1_ID, this.CMD_INVENTORY_M1_ID, this.Monthly_01.USE_DATE, (tag, data) => { this.setMonthSelected(tag, data); });
    this.jh.toMonthPicker(this.CMD_INVENTORY_M2_ID, this.CMD_INVENTORY_M2_ID, this.Monthly_02.USE_DATE, (tag, data) => { this.setMonthSelected(tag, data); });
    this.jh.toMonthPicker(this.CMD_INVENTORY_M3_ID, this.CMD_INVENTORY_M3_ID, this.Monthly_03.USE_DATE, (tag, data) => { this.setMonthSelected(tag, data); });
    this.jh.toDatePicker(this.CMD_INVENTORY_ONHAND_ID, this.CMD_INVENTORY_ONHAND_ID, this.OnHand.USE_DATE, (tag, data) => { this.setMonthSelected(tag, data); });
  }
  // ------------------------------------------------------
  public get UnitList(): Array<Unit> {
    return this.repoUnit.ListUnit;
  }
  // ------------------------------------------------------
  public setMonthSelected(tag,  date) {

    // console.log(tag, date);

    switch (tag) {
      case this.CMD_INVENTORY_M1_ID:
        this.Monthly_01.USE_DATE = date;
        break;
      case this.CMD_INVENTORY_M2_ID:
        this.Monthly_02.USE_DATE = date;
        break;
      case this.CMD_INVENTORY_M3_ID:
        this.Monthly_03.USE_DATE = date;
        break;
      case this.CMD_INVENTORY_ONHAND_ID:
        this.OnHand.USE_DATE = date;
        break;

    }

  }
  // ------------------------------------------------------
  public get IsHideUnit() {
    return true;
  }
  // ------------------------------------------------------
  public get Monthly_01(): UsageDetail {    
    return this.getUsageByItemNo(1);
  }
  // ------------------------------------------------------
  public get Monthly_02(): UsageDetail {
    return this.getUsageByItemNo(2);
  }
  // ------------------------------------------------------
  public get Monthly_03(): UsageDetail {
    return this.getUsageByItemNo(3);
  }  // ------------------------------------------------------
  public get OnHand(): UsageDetail {
    return this.getUsageByItemNo(4);
  }
  // ------------------------------------------------------
  private getUsageByItemNo(itemNo):UsageDetail {
    let result: UsageDetail = null;
    
    for (let item of this.repo.currentDocument.ReferenceDocument.DetailsOfUsage) {
      if (item.ITEM_NO == itemNo) {
        result = item;
        break;
      }
    }
    
    if (result == null) {  // usage not found.
      result = new UsageDetail();
      result.ITEM_NO = itemNo;
      result.USE_DATE = null;
      result.USE_QUANTITY = 0;
      result.SALE_QUANTITY = 0;
      result.REMAIN_QUANTITY = 0;
      result.QUANTITY_UNIT_ID = 0;
      result.IS_CURRENT_STOCK = 0;
      this.repo.currentDocument.ReferenceDocument.DetailsOfUsage.push(result);
    }

    return result;
  }
  // -----------------------------------------------------
  public IsUsageDetailNull(item_no):boolean {
    let usage: UsageDetail = this.getUsageByItemNo(item_no);
    return (usage.USE_DATE == null) && (usage.SALE_QUANTITY == 0 && usage.USE_QUANTITY == 0 && usage.REMAIN_QUANTITY == 0);
  }
  // ------------------------------------------------------
  public clearMonthly(item_no) {

    let usageDetail: UsageDetail = null;

    switch (item_no) {
      case 1:
        usageDetail = this.Monthly_01;
        this.clearValidate(this.CMD_INVENTORY_M1_ID);
        this.clearValidate('txtInventory_M1_QTY');
        break;
      case 2:
        usageDetail = this.Monthly_02;
        this.clearValidate(this.CMD_INVENTORY_M2_ID);
        this.clearValidate('txtInventory_M2_QTY');
        break;
      case 3:
        usageDetail = this.Monthly_03;
        this.clearValidate(this.CMD_INVENTORY_M3_ID);
        this.clearValidate('txtInventory_M3_QTY');
        break;
      case 4:
        usageDetail = this.OnHand;
        this.clearValidate(this.CMD_INVENTORY_ONHAND_ID);
        this.clearValidate('txtInventory_Onhand_QTY');
        break;
    }

    if (usageDetail != null) {
      usageDetail.REMAIN_QUANTITY = 0;
      usageDetail.SALE_QUANTITY = 0;
      usageDetail.USE_QUANTITY = 0;
      usageDetail.USE_DATE = null;
    }

  }
  // ------------------------------------------------------
  public clearValidate(el_id:string) {
    this.app.setValidateControl(el_id, true);
  }
  // ------------------------------------------------------
}
