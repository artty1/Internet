import { Appendix, Consession } from '../models/request-document';


export class ExcelFormatReader {

  private validateToNumber(data: any, defaultValue = 0):number {

    if (data == null || data == undefined || isNaN(data)) {
      return defaultValue;
    } else {
      return data;
    }

  }
  // ------------
  private validateToString(data: any, defaultValue = ""):string {
    if (data == null || data == undefined) {
      return defaultValue;
    } else {
      return data;
    }
  }
  // ------------
  private validateToDate(data: any, defaultValue = null):Date {

    if (data == null || data == undefined || data.length<1) {
      console.log('----------- ', data, ' is not date');
      return defaultValue;
    } else {

      let result = new Date(Date.parse(data));
      return result;

    }

  }
  // -----------------------------------------
  public RawToAppedix(data:Array<any>): Array<AppendixFormat> {

    let result: Array<AppendixFormat> = data.map(item => {

      let objResult = new AppendixFormat();

      objResult.name = this.validateToString(item[0]);
      objResult.brandname = this.validateToString(item[1]);
      objResult.series = this.validateToString(item[2]);
      objResult.description = this.validateToString(item[3]);
      objResult.qty = this.validateToNumber(item[4]);
      objResult.qty_unit_name = this.validateToString(item[5]);
      objResult.weight = this.validateToNumber(item[6]);
      objResult.weight_unit_name = this.validateToString(item[7]);
      objResult.remark = this.validateToString(item[8]);

      return objResult;

    });

    // remove row header
    if (result.length > 0) result.shift();
    //***************
    return result;
  }
  // -----------------------------------------
  public RawToConcession(data: Array<any>): Array<ConsessionFormat> {

    console.log('RawToConcession : ', data);

    let result: Array<ConsessionFormat> = data.map(item => {

      let objResult = new ConsessionFormat();

      objResult.document_no = this.validateToString(item[0]);
      objResult.issue_date = this.validateToDate(item[1]);
      objResult.remark = this.validateToString(item[2]);

      console.log('RawToConcession : ', item[1]);

      return objResult;
    });


    // remove row header
    if(result.length>0) result.shift();
    if(result.length>0) result.shift();
    //***************
    return result;
  }
  // -----------------------------------------
  public FormatToAppendix(data: Array<AppendixFormat>, only_selected: boolean = true): Array<Appendix> {

    if (only_selected) data = data.filter(item=>item.is_selected);

    let result: Array<Appendix> = data.map((item: AppendixFormat) => {
      let objectResult = new Appendix();

      objectResult.ID = 0;
      objectResult.PRODUCT_NAME = item.name;
      objectResult.PRODUCT_BRAND_NAME = item.brandname;
      objectResult.PRODUCT_SERIES = item.series;
      objectResult.PRODUCT_DESCRIPTION = item.description;
      objectResult.QUANTITY = item.qty;
      objectResult.QUANTITY_UNIT_ID = item.qty_unit_id;

      objectResult.WEIGHT = item.weight;
      objectResult.WEIGHT_UNIT_ID = item.weight_unit_id;

      objectResult.NOTE1 = item.remark;

      return objectResult;
    });

    return result;
  }
  // -----------------------------------------
  public FormatToAppendixConsession(data: Array<ConsessionFormat>, only_selected: boolean = true): Array<Consession> {


    if (only_selected) data = data.filter(item => item.is_selected);

    let result: Array<Consession> = data.map((item: ConsessionFormat) => {
      let objectResult = new Consession();

      objectResult.ID = 0;
      objectResult.DOCUMENT_NO = item.document_no;
      objectResult.DOCUMENT_DATE = item.issue_date
      objectResult.CONTACT_INFO = item.remark;

      console.log('objectResult : ', objectResult);
      console.log('item : ', item);


      return objectResult;
    });

    return result;
  }

}
// *********************************************************************
export class AppendixFormat {

  public is_selected: boolean = false;

  public name: string = "";
  public brandname: string = "";
  public series: string = "";
  public description: string = "";
  public qty: number = 0;
  public qty_unit_name: string = "";
  public qty_unit_id: number= 0;
  public weight: number = 0;
  public weight_unit_name: string = "";
  public weight_unit_id:number= 0;
  public remark: string = "";

  public constructor() {
    this.is_selected = false;
  }
}
// -----------------------------------------
export class ConsessionFormat {

  public is_selected: boolean=false;

  public document_no: string = "";
  public issue_date: Date = null;
  public remark: string = "";
}
// -----------------------------------------
