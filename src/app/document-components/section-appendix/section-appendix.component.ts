import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { DownloadService } from '../../shared/services/download.service';
import { LookupService } from '../../shared/services/lookup.service';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, Appendix, Armament } from '../../shared/models/request-document';
import { DialogResult } from '../../shared/base/base-modal-dialog';


import { PopupEditorAppendix } from '../popup-editor-appendix/popup-editor-appendix.component';
import { PopupUploadExcel } from '../popup-upload-excel/popup-upload-excel.component';
import { PopupListExcelAppendix } from '../popup-list-excel-appendix/popup-list-excel-appendix.component';
import { UnitService } from '../../shared/services/lookup/unit.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.hepler';
import { AppendixUnit } from './appendix-with-unit';

@Component({
  selector: 'cdss-section-appendix',
  templateUrl: './section-appendix.component.html',
  styleUrls: ['./section-appendix.component.css']
})
export class SectionAppendixComponent extends BaseSection implements OnInit {


  private editor: PopupEditorAppendix;
  private popupExcel: PopupUploadExcel;
  private popupList: PopupListExcelAppendix;

  private excel: ExcelHelper;

  private Arm: Armament;

  public AppendixsWithUnit: Array<AppendixUnit>;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected download: DownloadService, protected repoUnit: UnitService) {
    super(app, repo);
    this.title = 'ผนวกแนบท้ายใบอนุญาต';

    this.excel = new ExcelHelper();
    this.Arm = this.repo.currentDocument.Armament;
    // console.log('Appendixs: ', this.repo.currentDocument.Armament.Appendixs);

    // this.AppendixWithUnit = new Array();


    this.AppendixsWithUnit = this.Arm.Appendixs.map((item: Appendix)=>{
      const result = new AppendixUnit(item);
      result.updateUnit(this.repoUnit);
      return result;
    });


  }
  //---------------------------------------------------------------------------
  ngOnInit() {

  }
  //---------------------------------------------------------------------------
  public initPopup(arg: DialogResult) {

    if (arg.sender.tag == "excel") {
      this.popupExcel = arg.sender;
    } else if (arg.sender.tag == "list") {
      this.popupList = arg.sender;
    } else if (arg.sender.tag == "editor") {
      this.editor = arg.sender;
    }

  }
  //--------------------------------------------------------
  public TRID(index:number):string {
    return 'appendix-' + index;
  }
  //--------------------------------------------------------
  public get Footer(): string {
    return "จำนวน " + this.Arm.Appendixs.length + " ข้อมูล";
  }
  //--------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    let result: boolean = true;

    this.repo.currentDocument.Armament.Appendixs.forEach((item, index) => {
      let indexResult = this.editor.Validate(item);

      if (!indexResult) {
        this.app.setValidateControl(this.TRID(index), false);
      }

      item.ITEM_NO = (index+1);

      result = result && indexResult;
    });


    if (!result && isFocusToField) this.app.scrollToElement('div-section-appendix');

    // if(result && forSubmit){
    //   this.repo.currentDocument.Armament.Appendixs.forEach((item, index)=>{
    //     item.ITEM_NO = (index+1);
    //   });
    // }

    return result;
  }
  // ----------------------------------------

  // ----------------------------------------
  //---------------------------------------------------------------------------
  public newAppendix() {
    this.editor.openForNew(this.Arm.PRODUCT_NAME, this.Arm.PRODUCT_BRAND_NAME, this.Arm.PRODUCT_SERIES, (result: DialogResult) => {
      if (result.data == true) {
        // console.log('from editor : ', this.editor.appendix);

        this.repo.currentDocument.Armament.Appendixs.push(this.editor.appendix);
        const newAppWithUnit = new AppendixUnit(this.editor.appendix);
        newAppWithUnit.updateUnit(this.repoUnit);
        this.AppendixsWithUnit.push(newAppWithUnit);

        // console.log('from doc : ', this.repo.currentDocument.Armament.Appendixs);
      }
    });
  }
  //---------------------------------------------------------------------------
  public deleteAppendix(item) {
    this.AppendixsWithUnit = this.AppendixsWithUnit.filter(a=> a.Appendix!=item);
    this.repo.currentDocument.Armament.Appendixs = this.repo.currentDocument.Armament.Appendixs.filter(a=> a!=item);
  }
  //---------------------------------------------------------------------------
  public editAppendix(item, tr_index) {

    // const data = JSON.parse(JSON.stringify(item));
    console.log('editAppendix: ', item, tr_index);
    this.editor.openForEdit(item, (result: DialogResult) => {
    // this.editor.openForEdit(data, (result: DialogResult) => {
      if (result.data == true) {

        let idx = this.repo.currentDocument.Armament.Appendixs.indexOf(item);
        //if (idx > -1) this.repo.currentDocument.Armament.Appendixs[idx] = this.editor.appendix;
        if (idx > -1){
          this.repo.currentDocument.Armament.Appendixs[idx] = this.editor.appendix;
          this.AppendixsWithUnit[idx].Appendix = this.repo.currentDocument.Armament.Appendixs[idx];
          this.AppendixsWithUnit[idx].updateUnit(this.repoUnit);
        }

      }

      this.app.setValidateControl(this.TRID(tr_index), this.editor.IsValidate);

    });
  }
  //---------------------------------------------------------------------------
  public updateExcel() {
    this.popupExcel.openDialog((result: DialogResult) => {

      if(result.data != false){
        this.popupList.showData(result.data, (popupResult: DialogResult) => {
          console.log('excel result : ', popupResult.data);

          const appendixList = <Array<any>>popupResult.data;

          const appdixs = appendixList.map((item:any)=>{
            const result = new Appendix();

            result.ID = 0;
            result.LICENSE_REQ_DTL_ID = 0;
            result.ITEM_NO = 0;
            result.PRODUCT_NAME = item.PRODUCT_NAME ? item.PRODUCT_NAME : "";
            result.PRODUCT_BRAND_NAME = item.PRODUCT_BRAND_NAME ? item.PRODUCT_BRAND_NAME : "";
            result.PRODUCT_SERIES = item.PRODUCT_SERIES ? item.PRODUCT_SERIES : "";
            result.PRODUCT_DESCRIPTION = item.PRODUCT_DESCRIPTION ? item.PRODUCT_DESCRIPTION : "";
            result.TARIFF_CODE = item.TARIFF_CODE ? item.TARIFF_CODE : "";
            result.STATISTICAL_CODE = item.STATISTICAL_CODE ? item.STATISTICAL_CODE : "";

            result.QUANTITY = isNaN(item.QUANTITY) ? 0 : parseFloat(item.QUANTITY);
            result.QUANTITY_UNIT_ID = isNaN(item.QUANTITY_UNIT_ID) ? 0 : parseInt(item.QUANTITY_UNIT_ID);
            result.CUSTOMS_QUANTITY_UNIT_CODE = item.CUSTOMS_QUANTITY_UNIT_CODE ? item.CUSTOMS_QUANTITY_UNIT_CODE : "";
            result.WEIGHT = isNaN(item.WEIGHT) ? 0 : parseFloat(item.WEIGHT);
            result.WEIGHT_UNIT_ID = isNaN(item.WEIGHT_UNIT_ID) ? 0 : parseInt(item.WEIGHT_UNIT_ID);
            result.CUSTOMS_WEIGHT_UNIT_CODE = item.CUSTOMS_WEIGHT_UNIT_CODE ? item.CUSTOMS_WEIGHT_UNIT_CODE : "";
            result.UNIT_PRICE = isNaN(item.UNIT_PRICE) ? 0 : parseFloat(item.UNIT_PRICE);
            result.TOTAL_PRICE = isNaN(item.TOTAL_PRICE) ? 0 : parseFloat(item.TOTAL_PRICE);
            result.NOTE1 = item.NOTE1 ? item.NOTE1 : "";

            if(result.WEIGHT < 1) result.WEIGHT_UNIT_ID = -1;

            return result;
          });

          const appdixsWithUnit = appdixs.map((apx: Appendix)=>{
            const result = new AppendixUnit(apx);
            result.updateUnit(this.repoUnit);
            return result;
          });

          this.AppendixsWithUnit.push(...appdixsWithUnit);
          this.repo.currentDocument.Armament.Appendixs.push(...appdixs);


          // this.repo.currentDocument.Armament.Appendixs.push(...appendixList.map((item:any)=>{
          //   const result = new Appendix();

          //   result.ID = 0;
          //   result.LICENSE_REQ_DTL_ID = 0;
          //   result.ITEM_NO = 0;
          //   result.PRODUCT_NAME = item.PRODUCT_NAME ? item.PRODUCT_NAME : "";
          //   result.PRODUCT_BRAND_NAME = item.PRODUCT_BRAND_NAME ? item.PRODUCT_BRAND_NAME : "";
          //   result.PRODUCT_SERIES = item.PRODUCT_SERIES ? item.PRODUCT_SERIES : "";
          //   result.PRODUCT_DESCRIPTION = item.PRODUCT_DESCRIPTION ? item.PRODUCT_DESCRIPTION : "";
          //   result.TARIFF_CODE = item.TARIFF_CODE ? item.TARIFF_CODE : "";
          //   result.STATISTICAL_CODE = item.STATISTICAL_CODE ? item.STATISTICAL_CODE : "";

          //   result.QUANTITY = isNaN(item.QUANTITY) ? 0 : parseFloat(item.QUANTITY);
          //   result.QUANTITY_UNIT_ID = isNaN(item.QUANTITY_UNIT_ID) ? 0 : parseInt(item.QUANTITY_UNIT_ID);
          //   result.CUSTOMS_QUANTITY_UNIT_CODE = item.CUSTOMS_QUANTITY_UNIT_CODE ? item.CUSTOMS_QUANTITY_UNIT_CODE : "";
          //   result.WEIGHT = isNaN(item.WEIGHT) ? 0 : parseFloat(item.WEIGHT);
          //   result.WEIGHT_UNIT_ID = isNaN(item.WEIGHT_UNIT_ID) ? 0 : parseInt(item.WEIGHT_UNIT_ID);
          //   result.CUSTOMS_WEIGHT_UNIT_CODE = item.CUSTOMS_WEIGHT_UNIT_CODE ? item.CUSTOMS_WEIGHT_UNIT_CODE : "";
          //   result.UNIT_PRICE = isNaN(item.UNIT_PRICE) ? 0 : parseFloat(item.UNIT_PRICE);
          //   result.TOTAL_PRICE = isNaN(item.TOTAL_PRICE) ? 0 : parseFloat(item.TOTAL_PRICE);
          //   result.NOTE1 = item.NOTE1 ? item.NOTE1 : "";

          //   if(result.WEIGHT < 1) result.WEIGHT_UNIT_ID = -1;

          //   return result;
          // }));

          // this.repo.currentDocument.Armament.Appendixs.push(...popupResult.data);

          console.log('Appendixs : ', this.repo.currentDocument.Armament.Appendixs);

        });
      }
    });
  }
  //---------------------------------------------------------------------------

  // public get AppendixList(): Array<Appendix> {
  //   return this.repo.currentDocument.Armament.Appendixs;
  // }
  public get AppendixList(): Array<Appendix> {
    return this.repo.currentDocument.Armament.Appendixs;
  }
  //---------------------------------------------------------------------------
  // public downloadTemplate() {
  //   this.download.templateOfAppendix();
  // }
  //---------------------------------------------------------------------------
  public exportToExcel() {
    // const header = [ "ชื่อยุทธภัณฑ์", "ยี่ห้อ", "รุ่น", "รายละเอียดเพิ่มเติม", "จำนวน", "หน่วยนับจำนวน" , "น้ำหนัก", "หน่วยน้ำหนัก", "หมายเหตุ" ];
    // // const data = this.AppendixList.map((item: Appendix)=>{
    // //   // return [ item.PRODUCT_NAME, item.PRODUCT_BRAND_NAME, item.PRODUCT_SERIES, item.PRODUCT_DESCRIPTION, item.QUANTITY, item.quantity_unit_name, item.WEIGHT, item.weight_unit_name, item.NOTE1 ];
    // //   return [ item.PRODUCT_NAME, item.PRODUCT_BRAND_NAME, item.PRODUCT_SERIES, item.PRODUCT_DESCRIPTION, item.QUANTITY, "", item.WEIGHT, "", item.NOTE1 ];
    // // });

    // const data = this.AppendixsWithUnit.map((item: AppendixUnit)=>{
    //   // return [ item.PRODUCT_NAME, item.PRODUCT_BRAND_NAME, item.PRODUCT_SERIES, item.PRODUCT_DESCRIPTION, item.QUANTITY, item.quantity_unit_name, item.WEIGHT, item.weight_unit_name, item.NOTE1 ];
    //   return [ item.Appendix.PRODUCT_NAME, item.Appendix.PRODUCT_BRAND_NAME, item.Appendix.PRODUCT_SERIES, item.Appendix.PRODUCT_DESCRIPTION, item.Appendix.QUANTITY, item.QUANTITY_UNIT_NAME, item.Appendix.WEIGHT, item.WEIGHT_UNIT_NAME, item.Appendix.NOTE1 ];
    // });

    // this.excel.toFile(data, [ header ], "appendix");
    // this.excel.exportToExcel(data, header, 'appendix');

    const data = this.AppendixsWithUnit.map((item: AppendixUnit)=>{
      return [ item.Appendix.PRODUCT_NAME, item.Appendix.PRODUCT_BRAND_NAME, item.Appendix.PRODUCT_SERIES, item.Appendix.PRODUCT_DESCRIPTION, item.Appendix.QUANTITY, item.QUANTITY_UNIT_NAME, item.Appendix.WEIGHT, item.WEIGHT_UNIT_NAME, item.Appendix.NOTE1 ];
    });

    this.excel.toFile(data, [ this.EXCEL_HEADER_APPENDIX ], "appendix");

  }
  //---------------------------------------------------------------------------
  private EXCEL_HEADER_APPENDIX = [ "ชื่อยุทธภัณฑ์", "ยี่ห้อ", "รุ่น", "รายละเอียดเพิ่มเติม", "จำนวน", "หน่วยนับจำนวน" , "น้ำหนัก", "หน่วยน้ำหนัก", "หมายเหตุ" ];
}
