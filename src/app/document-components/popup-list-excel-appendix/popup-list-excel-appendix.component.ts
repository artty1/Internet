import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';
import { ApplicationContext } from '../../application-context';
import { Appendix } from '../../shared/models/request-document';
import { ExcelFormatReader, AppendixFormat } from '../../shared/helpers/excel-format-reader';
import { UnitService } from '../../shared/services/lookup/unit.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'cdss-popup-list-excel-appendix',
  templateUrl: './popup-list-excel-appendix.component.html',
  styleUrls: ['./popup-list-excel-appendix.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopupListExcelAppendix extends baseModalDialog implements OnInit {

  private xlsConvertHelper = new ExcelFormatReader();
  private rawData: Array<AppendixFormat>;

  private CAPTION_IMPORT = 'นำเข้า';
  private CAPTION_NOT_IMPORT = 'เอาออก';
  private CAPTION_ALL = "ทั้งหมด";

  private CSS_ROW_IMPORT = "row-import";
  private CSS_ROW_NOT_IMPORT = "row-not-import";

  // ---------------------------------
  constructor(public app:ApplicationContext, protected repoUnit:UnitService) {
    super();

    this.rawData = new Array();

  }
  // ---------------------------------
  ngOnInit() {

  }
  // ---------------------------------
  public showData(data: any, callback: Function) {
    this.rawData = this.xlsConvertHelper.RawToAppedix(data);
    this.openDialog(callback);
  }
  // ---------------------------------
  public get AppendixList(): Array<AppendixFormat> {
    return this.rawData;
  }
  // ---------------------------------
  public get SelectedCount(): number {
    return this.rawData.filter(item=>item.is_selected==true).length;
  }
  // ---------------------------------
  private get selectedAppendix(): Array<Appendix> {

    this.rawData.forEach(item => {
      item.weight_unit_id = this.repoUnit.getUnitFormName(item.weight_unit_name);
      item.qty_unit_id = this.repoUnit.getUnitFormName(item.qty_unit_name);
      console.log("item.qty_unit_id : ", item.qty_unit_id);
    });
    
    console.log('raw data : ', this.rawData);

    return this.xlsConvertHelper.FormatToAppendix(this.rawData);
  }
  // ---------------------------------
  public get selectCount():number {
    return this.rawData.filter(item => item.is_selected == true).length;
  }
  // ---------------------------------
  public get Footer():string {
    let result: string = "";
    let select_count = this.selectCount;
    let data_count = this.rawData.length;
    
    if (select_count == data_count) {
      result = "จำนวน " + data_count + " ข้อมูล";
    } else {
      result = "จำนวน "+ select_count+" / "+ data_count +" ข้อมูล";
    }

    return result;
  }
  // ---------------------------------
  public swapSelect(item:AppendixFormat) {
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
  public getCaptionOfSwapButton(item: AppendixFormat):string {

    if (item.is_selected) {
      return this.CAPTION_NOT_IMPORT;
    } else {
      return this.CAPTION_IMPORT;
    }

  }
  // ---------------------------------
  public getClass(item:AppendixFormat): string {

    if (item.is_selected) {
      return this.CSS_ROW_IMPORT;
    } else {
      return this.CSS_ROW_NOT_IMPORT;
    }

  }
  // ---------------------------------
  public saveData() {

    this.innerClose(this.selectedAppendix);
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
