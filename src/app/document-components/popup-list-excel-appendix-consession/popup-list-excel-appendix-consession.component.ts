import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';
import { ExcelFormatReader, ConsessionFormat } from '../../shared/helpers/excel-format-reader';
import { Consession, Appendix } from '../../shared/models/request-document';




@Component({
  selector: 'cdss-popup-list-excel-appendix-consession',
  templateUrl: './popup-list-excel-appendix-consession.component.html',
  styleUrls: ['./popup-list-excel-appendix-consession.component.css']
})
export class PopupListExcelAppendixConsession extends baseModalDialog implements OnInit {

  private xlsConvertHelper: ExcelFormatReader = new ExcelFormatReader();
  private rawData: Array<ConsessionFormat>;

  private CAPTION_IMPORT = 'นำเข้า';
  private CAPTION_NOT_IMPORT = 'เอาออก';
  private CAPTION_ALL = "ทั้งหมด";

  private CSS_ROW_IMPORT = "row-import";
  private CSS_ROW_NOT_IMPORT = "row-not-import";

  constructor(public app: ApplicationContext) {
    super();

    this.rawData = new Array();

  }
  //--------------------------------------------------------------------
  ngOnInit() {


  }
  //--------------------------------------------------------------------
  public showData(data: any, callback: Function) {

    this.rawData = this.xlsConvertHelper.RawToConcession(data);

    console.log('show date : ', this.rawData);

    this.openDialog(callback);
  }
  //--------------------------------------------------------------------
  // ---------------------------------
  public get ConsessionList(): Array<ConsessionFormat> {
    return this.rawData;
  }
  // ---------------------------------
  public get SelectedCount(): number {
    return this.rawData.filter(item => item.is_selected == true).length;
  }
  // ---------------------------------
  private get selectedConsession(): Array<Consession> {
    let result: Array<Consession> = this.xlsConvertHelper.FormatToAppendixConsession(this.rawData);

    console.log('selectedConsession : ', result);
    return result;
  }
  // ---------------------------------
  public get selectCount(): number {
    return this.rawData.filter(item => item.is_selected == true).length;
  }
  // ---------------------------------
  public get Footer(): string {
    let result: string = "";
    let select_count = this.selectCount;
    let data_count = this.rawData.length;

    if (select_count == data_count) {
      result = "จำนวน " + data_count + " ข้อมูล";
    } else {
      result = "จำนวน " + select_count + " / " + data_count + " ข้อมูล";
    }

    return result;
  }
  // ---------------------------------
  public swapSelect(item: ConsessionFormat) {
    item.is_selected = !item.is_selected;
  }
  // ---------------------------------
  public swapSelectAll() {
    let select_count = this.selectCount;
    let is_select_all = (select_count < this.rawData.length);

    this.rawData.forEach(item => {
      item.is_selected = is_select_all;
    });

  }
  // ---------------------------------
  public get getCaptionOfSelectAll(): string {
    let select_count = this.selectCount;
    if (select_count < this.rawData.length) {
      return this.CAPTION_IMPORT + this.CAPTION_ALL;
    } else {
      return this.CAPTION_NOT_IMPORT + this.CAPTION_ALL;
    }
  }
  // ---------------------------------
  public getCaptionOfSwapButton(item: ConsessionFormat): string {

    if (item.is_selected) {
      return this.CAPTION_NOT_IMPORT;
    } else {
      return this.CAPTION_IMPORT;
    }

  }
  // ---------------------------------
  public getClass(item: ConsessionFormat): string {

    if (item.is_selected) {
      return this.CSS_ROW_IMPORT;
    } else {
      return this.CSS_ROW_NOT_IMPORT;
    }

  }
  // ---------------------------------
  //public get selectedConsession():Array<Consession> {
  //  return this.xlsConvertHelper.FormatToAppendixConsession(this.rawData);
  //}
  // ---------------------------------
  public saveData() {
    this.innerClose(this.selectedConsession);
  }
  // ---------------------------------
  public cancelData() {
    this.closeDialog(false);
  }
  // ---------------------------------
  public get isEnabledOK(): boolean {
    return (this.selectCount > 0);
  }
  // ---------------------------------
}
