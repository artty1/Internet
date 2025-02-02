//import { Address } from '../models/common';
import { Location } from '../models/request-document';

export class TransformCommonData {

  //---------------------------------------------------
  public typeOfLocation(FOR_PRODUCT:boolean):string{
      return FOR_PRODUCT ? 'สำหรับการผลิต' : 'สำหรับเก็บ';
  }
  //---------------------------------------------------   
  public addressToString(data: Location): string {

    let result: string = '';
    //-------------------------------------------------------
    let isBangkokAddress = (data.PROVINCE_NAME == "กรุงเทพมหานคร") ? true : false;
    let hasData: boolean = false;

    //AddressNo ------------------------------------
    if (data.ADDRESS_NO != null && data.ADDRESS_NO.trim().length > 0 && data.ADDRESS_NO.trim() != "-" ) {
      result += "เลขที่ " + data.ADDRESS_NO;
      hasData = true;
    }

    //BuildingName ------------------------------------
    if (data.BUILDING_NAME != null && data.BUILDING_NAME.trim().length > 0) {
      if (hasData) result += " ";
      result += data.BUILDING_NAME;
      hasData = true;
    }

    //Village --------------------------------------------
    if (data.VILLAGE != null && data.VILLAGE.trim().length > 0) {
      if (hasData) result += " ";
      result += "หมู่บ้าน" + data.VILLAGE;
      hasData = true;
    }

    //Moo --------------------------------------------
    if (data.MOO != null && data.MOO.trim().length > 0) {
      if (hasData) result += " ";
      result += "หมู่ที่" + data.MOO;
      hasData = true;
    }

    //Soi  --------------------------------------------
    if (data.SOI != null && data.SOI.trim().length > 0) {
      if (hasData) result += " ";
      result += "ซอย" + data.SOI;
      hasData = true;
    }

    //Street ------------------------------------------
    if (data.STREET != null && data.STREET.trim().length > 0) {
      if (hasData) result += " ";
      result += "ถนน" + data.STREET;
      hasData = true;
    }

    //DistrictName -----------------------------------
    if (data.DISTRICT_NAME != null && data.DISTRICT_NAME.trim().length > 0) {
      if (hasData) result += " ";
      if (isBangkokAddress) {
        result+= "แขวง" + data.DISTRICT_NAME
      } else {
        result += "ตำบล" + data.DISTRICT_NAME
      }
      hasData = true;
    }

    //SubProvinceName --------------------------------
    if (data.SUB_PROVINCE_NAME != null && data.SUB_PROVINCE_NAME.trim().length > 0) {
      if (hasData) result += " ";
      if (isBangkokAddress) {
        result += "เขต" + data.SUB_PROVINCE_NAME
      } else {
        result += "อำเภอ" + data.SUB_PROVINCE_NAME
      }
      hasData = true;
    }

    //ProvinceName ------------------------------------
    if (data.PROVINCE_NAME != null && data.PROVINCE_NAME.trim().length > 0) {
      if (hasData) result += " ";
      if (isBangkokAddress) {
        result +=  data.PROVINCE_NAME
      } else {
        result += "จังหวัด" + data.PROVINCE_NAME
      }
      hasData = true;
    }

    //Postcode ------------------------------------------
    if (data.POSTCODE != null && data.POSTCODE.trim().length > 0) {
      if (hasData) result += " ";
      result += data.POSTCODE;
      hasData = true;
    }

    //-------------------------------------------------------
    return result;

  }
}
