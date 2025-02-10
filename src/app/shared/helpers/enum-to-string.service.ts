import { Injectable } from "@angular/core";

import { LicenseType, RequestDocumentType } from "../enums/request-type.enum";
import { DocumentStatus } from "../enums/document-status.enum";

@Injectable({
  providedIn: "root"
})
export class EnumToStringService {
  constructor() {}
  // -----------------------------------------------------------
  public ToNameOfLicenseStatus(is_active: boolean) {
    return is_active ? "Active" : "Expired";
  }
  // -----------------------------------------------------------
  public ToChanalNameWithLicenseReqType(LICENSE_REQ_TYPE: number): string {
    return this.ToChanalName(LICENSE_REQ_TYPE == 1);
  }
  public ToChanalName(is_online_request: boolean): string {
    return is_online_request ? "internet" : "กคยภ.";
  }
  // -----------------------------------------------------------
  public ToFullAddress(
    no: string,
    building: string,
    moo: string,
    soi: string,
    street: string,
    sub_district: string,
    district: string,
    province: string,
    postcode: string
  ): string {
    return (
      no +
      " " +
      building +
      " " +
      moo +
      " " +
      soi +
      " " +
      street +
      " " +
      sub_district +
      " " +
      district +
      " " +
      province +
      " " +
      postcode
    );
  }
  // -----------------------------------------------------------
  public ToFullName(
    firstname: string,
    prefix: string = "",
    lastname: string = "",
    middle: string = ""
  ): string {
    if (middle.length > 0) {
      middle = " " + middle + " ";
    } else {
      middle = " ";
    }

    return prefix + " " + firstname + middle + lastname;
  }
  // -----------------------------------------------------------
  // public ToNameOfLicenseType(license_type_enum: number, isAbbr: boolean = false): string {
  //   let result = "";

  //   switch (license_type_enum) {
  //     case LicenseType.Enter: result = (isAbbr ? "ย.ภ.2" : "ใบอนุญาตสั่งเข้ามาซึ่งยุทธภัณฑ์ ย.ภ.2"); break;
  //     case LicenseType.Import: result = (isAbbr ? "ย.ภ.3" : "ใบอนุญาตนำเข้ามาซึ่งยุทธภัณฑ์ ย.ภ.3"); break;
  //     case LicenseType.Production: result = (isAbbr ? "ย.ภ.4" : "ใบอนุญาตผลิตซึ่งยุทธภัณฑ์ ย.ภ.4"); break;
  //     case LicenseType.Owning: result = (isAbbr ? "ย.ภ.5" : "ใบอนุญาตมีซึ่งยุทธภัณฑ์ ย.ภ.5"); break;
  //     //case LicenseType.Renewal: result = "คำขอต่ออายุใบอนุญาต"; break;
  //     //case LicenseType.Substitute: result = "คำขอใบแทนใบอนุญาต"; break;
  //     //case LicenseType.SendSample: result = "คำขอหนังสืออนุญาตส่งตัวอย่าง"; break;
  //     //case LicenseType.Export: result = "คำขอหนังสืออนุญาตส่งออก (รายปี)"; break;
  //     //case LicenseType.ExportSpecial: result = "คำขอหนังสืออนุญาตส่งออก (พิเศษ)"; break;
  //     //case LicenseType.CrossBorder: result = "คำขอหนังสืออนุญาตส่งผ่านแดน"; break;
  //     default:
  //       result = "UNKNOWN";
  //   }

  //   return result;
  // }
  public ToNameOfLicenseType(
    license_type_enum: number,
    isAbbr: boolean = false
  ): string {
    let result = "";

    switch (license_type_enum) {
      case LicenseType.Unknown:
        result = "Unknown";
        break;
      case LicenseType.Req_Enter:
        result =
          "คำขอรับใบอนุญาต สั่งเข้ามา นำเข้ามาหรือมีซึ่งยุทธภัณฑ์ (ย.ภ.1)";
        break;
      case LicenseType.License_Enter:
        result = isAbbr
          ? "ใบอนุญาตสั่งเข้ามา"
          : "ใบอนุญาตสั่งเข้ามาซึ่งยุทธภัณฑ์ (ย.ภ.2)";
        break;
      case LicenseType.License_Import:
        result = isAbbr
          ? "ใบอนุญาตนำเข้ามา"
          : "ใบอนุญาตนำเข้ามาซึ่งยุทธภัณฑ์ (ย.ภ.3)";
        break;
      case LicenseType.License_Production:
        result = isAbbr ? "ใบอนุญาตผลิต" : "ใบอนุญาตผลิตซึ่งยุทธภัณฑ์ (ย.ภ.4)";
        break;
      case LicenseType.License_Owning:
        result = isAbbr ? "ใบอนุญาตมี" : "ใบอนุญาตมีซึ่งยุทธภัณฑ์ (ย.ภ.5)";
        break;
      case LicenseType.Req_Renew:
        result =
          "คำขอต่ออายุใบอนุญาต สั่งเข้ามา นำเข้ามาหรือมีซึ่งยุทธภัณฑ์ (ย.ภ.6)";
        break;
      case LicenseType.Req_Substitue:
        result =
          "คำขอรับใบแทนใบอนุญาต สั่งเข้ามา นำเข้ามาหรือมีซึ่งยุทธภัณฑ์ (ย.ภ.7)";
        break;
      case LicenseType.License_Export:
        result = "หนังสืออนุญาตส่งออก (รายปี)";
        break;
      case LicenseType.License_CrossBorder:
        result = "หนังสืออนุญาตส่งผ่านแดน";
        break;
      case LicenseType.Substitue_License:
        result = "ใบแทนใบอนุญาต";
        break;
      case LicenseType.Form_ExplanRequest:
        result = "แบบชี้แจงประกอบแบบคำขอ";
        break;
      case LicenseType.Doc_RequestExamBackground:
        result = "เอกสารขอสอบประวัติ";
        break;

      case LicenseType.Doc_ExamBackground:
        result = "เอกสารนำสอบประวัติ";
        break;
      case LicenseType.Doc_Report:
        result = "ใบนำเรียน";
        break;
      case LicenseType.Req_Export:
        result = "คำขอรับหนังสืออนุญาตส่งออก ส่งผ่านแดน ไปนอกราชอาณาจักร";
        break;
      case LicenseType.Req_InformExport:
        result = "คำขอแจ้งการส่งออก ส่งผ่านแดน ไปนอกราชอาณาจักร";
        break;
      case LicenseType.Doc_InformExport:
        result = "หนังสือแจ้งรายละเอียดการส่งออกแต่ละครั้ง";
        break;
      case LicenseType.License_Example:
        result = "หนังสืออนุญาตส่งออกตัวอย่าง";
        break;
      case LicenseType.License_ExportYearly:
        result = "หนังสืออนุญาตส่งออก (กรณีพิเศษ)";
        break;
      case LicenseType.Doc_PlaceReview:
        result = "เอกสารขอตรวจสอบสถานที่";
        break;
      case LicenseType.Result_PlaceReview:
        result = "ผลตรวจสอบสถานที่";
        break;
      case LicenseType.Doc_Appendix:
        result = "ภาคผนวกท้ายใบอนุญาต";
        break;
      case LicenseType.Report_AmamentList:
        result = "บัญชีรายการยุทธภัณฑ์";
        break;
      case LicenseType.Doc_DocumentReview:
        result = "ใบตรวจเช็คเอกสาร";
        break;
      case LicenseType.Form_InformExport:
        result = "หนังสือแจ้งรายละเอียดการส่งออกแต่ละครั้ง (ฟอร์ม)";
        break;
      case LicenseType.Doc_Concession:
        result = "ภาคผนวกท้ายใบอนุญาต (ประทานบัตร)";
        break;
      case LicenseType.Report_InformImport:
        result = "หนังสือแจ้งรายละเอียดการนำเข้าแต่ละครั้ง";
        break;

      default:
        result = "Unknown";
    }

    return result;
  }
  // -----------------------------------------------------------
  public ToNameOfRequestDocumentType(
    enum_of_request_type: number,
    isAbbr: boolean = false
  ): string {
    let result = "";

    switch (enum_of_request_type) {
      //case RequestDocumentType.Enter: result = "คำขอใบอนุญาตสั่งเข้า"; break;
      case RequestDocumentType.EnterWithOwner:
        result = "คำขอใบอนุญาตสั่งเข้า-มี";
        break;
      //case RequestDocumentType.Import: result = "คำขอใบอนุญาตนำเข้า"; break;
      case RequestDocumentType.ImportWithOwner:
        result = "คำขอใบอนุญาตนำเข้า-มี";
        break;
      //case RequestDocumentType.Production: result = "คำขอใบอนุญาตผลิต"; break;
      case RequestDocumentType.ProductionWithOwner:
        result = "คำขอใบอนุญาตผลิต-มี";
        break;
      case RequestDocumentType.Owner:
        result = "คำขอใบอนุญาตมี";
        break;
      case RequestDocumentType.SendSample:
        result = "คำขอหนังสืออนุญาตส่งตัวอย่าง";
        break;
      //case RequestDocumentType.SendSampleWithOwner: result = "คำขอหนังสืออนุญาตส่งตัวอย่าง"; break;
      case RequestDocumentType.Export:
        result = "คำขอหนังสืออนุญาตส่งออก (รายปี)";
        break;
      case RequestDocumentType.ExportSpecial:
        result = "คำขอหนังสืออนุญาตส่งออก (พิเศษ)";
        break;
      case RequestDocumentType.CrossBorder:
        result = "คำขอหนังสืออนุญาตส่งผ่านแดน";
        break;
      case RequestDocumentType.EInternet:
        result = "E-Internet";
        break;
      //case RequestDocumentType.Renewal:
      //case RequestDocumentType.Renewal_CrossBorder:
      //case RequestDocumentType.Renewal_CrossBorderWithOwner:
      //case RequestDocumentType.Renewal_Enter:
      //case RequestDocumentType.Renewal_EnterWithOwner:
      //case RequestDocumentType.Renewal_Export:
      //case RequestDocumentType.Renewal_ExportWithOwner:
      //case RequestDocumentType.Renewal_ExportSpecial:
      //case RequestDocumentType.Renewal_ExportSpecialWithOwner:
      //case RequestDocumentType.Renewal_Import:
      //case RequestDocumentType.Renewal_ImportWithOwner:
      //case RequestDocumentType.Renewal_Owner:
      //case RequestDocumentType.Renewal_Production:
      //case RequestDocumentType.Renewal_ProductionWithOwner:
      //case RequestDocumentType.Renewal_SendSample:
      //case RequestDocumentType.Renewal_SendSampleWithOwner:
      //  result = "คำขอต่ออายุใบอนุญาต";
      //  break;
      case RequestDocumentType.Renewal:
      case RequestDocumentType.Renewal_Owner:
        result = "คำขอต่ออายุใบอนุญาตมี";
        break;
      case RequestDocumentType.Renewal_CrossBorder:
        result = "คำขอต่ออายุใบอนุญาตส่งผ่านแดน";
        break;
      // case RequestDocumentType.Renewal_CrossBorderWithOwner: result = "คำขอต่ออายุใบอนุญาตส่งผ่านแดน-มี"; break;
      case RequestDocumentType.Renewal_Enter:
        result = "คำขอต่ออายุใบอนุญาตสั่งเข้า";
        break;
      // case RequestDocumentType.Renewal_EnterWithOwner: result = "คำขอต่ออายุใบอนุญาตสั่งเข้า-มี"; break;
      case RequestDocumentType.Renewal_Export:
        result = "คำขอต่ออายุส่งออก (รายปี)";
        break;
      // case RequestDocumentType.Renewal_ExportWithOwner: result = "คำขอต่ออายุส่งออก-มี (รายปี)"; break;
      case RequestDocumentType.Renewal_ExportSpecial:
        result = "คำขอต่ออายุใบอนุญาตส่งออก (พิเศษ)";
        break;
      // case RequestDocumentType.Renewal_ExportSpecialWithOwner: result = "คำขอต่ออายุใบอนุญาตส่งออก-มี (พิเศษ)"; break;
      case RequestDocumentType.Renewal_Import:
        result = "คำขอต่ออายุใบอนุญาตนำเข้า";
        break;
      // case RequestDocumentType.Renewal_ImportWithOwner: result = "คำขอต่ออายุใบอนุญาตนำเข้า-มี"; break;
      case RequestDocumentType.Renewal_Owner:
        result = "คำขอต่ออายุใบอนุญาต";
        break;
      case RequestDocumentType.Renewal_Production:
        result = "คำขอต่ออายุใบอนุญาตผลิต";
        break;
      // case RequestDocumentType.Renewal_ProductionWithOwner: result = "คำขอต่ออายุใบอนุญาตผลิต-มี"; break;
      case RequestDocumentType.Renewal_SendSample:
        result = "คำขอต่ออายุใบอนุญาตส่งตัวอย่าง";
        break;
      // case RequestDocumentType.Renewal_SendSampleWithOwner: result = "คำขอต่ออายุใบอนุญาตส่งตัวอย่าง-มี"; break;

      case RequestDocumentType.Substitute:
      case RequestDocumentType.Substitute_Enter:
        result = "คำขอใบแทนใบอนุญาตสั่งเข้า";
        break;
      case RequestDocumentType.Substitute_CrossBorder:
        result = "คำขอใบแทนใบอนุญาตส่งผ่านแดน";
        break;
      case RequestDocumentType.Substitute_Export:
        result = "คำขอใบแทนใบอนุญาตส่งออก (รายปี)";
        break;
      case RequestDocumentType.Substitute_ExportSpecial:
        result = "คำขอใบแทนใบอนุญาตส่งออก (พิเศษ)";
        break;
      case RequestDocumentType.Substitute_Import:
        result = "คำขอใบแทนใบอนุญาตนำเข้า";
        break;
      case RequestDocumentType.Substitute_Owner:
        result = "คำขอใบแทนใบอนุญาตมี";
        break;
      case RequestDocumentType.Substitute_Production:
        result = "คำขอใบแทนใบอนุญาตผลิต";
        break;
      case RequestDocumentType.Substitute_SendSample:
        result = "คำขอใบแทนใบอนุญาตส่งตัวอย่าง";
        break;

      case RequestDocumentType.OwnerReferEnter:
        result = "คำขอใบอนุญาตมี-ตามสั่ง";
        break;
      case RequestDocumentType.OwnerReferImport:
        result = "คำขอใบอนุญาตมี-ตามนำเข้า";
        break;
      case RequestDocumentType.OwnerReferProduction:
        result = "คำขอใบอนุญาตมี-ตามผลิต";
        break;
      case RequestDocumentType.OwnerReferSendSample:
        result = "คำขอใบอนุญาตมี-ตามส่งตัวอย่าง";
        break;
      case RequestDocumentType.OwnerReferExport:
        result = "คำขอใบอนุญาตมี-ตามส่งออก";
        break;
      case RequestDocumentType.OwnerReferExportSpecial:
        result = "คำขอใบอนุญาตมี-ตามส่งออก (พิเศษ)";
        break;
      case RequestDocumentType.OwnerReferCrossBorder:
        result = "คำขอใบอนุญาตมี-ตามส่งผ่านแดน";
        break;

      default:
        if (enum_of_request_type != undefined) {
          result = enum_of_request_type.toString();
        } else {
          result = "";
        }
    }

    return result;
  }
  // -----------------------------------------------------------
  public ToNameOfRequestStatus(enum_of_document_status: number): string {
    let result = "NONE";

    switch (enum_of_document_status) {
      case DocumentStatus.Submited:
        result = "Submit";
        break;
      case DocumentStatus.Accepted:
        result = "Accept";
        break;
      //case DocumentStatus.Inform: result = "Inform"; break;
      case DocumentStatus.Inform:
        result = "Pending";
        break;
      case DocumentStatus.Approved:
        result = "Approve";
        break;
      case DocumentStatus.RejectToTrader:
        result = "Reject";
        break;

      case DocumentStatus.Draft:
        result = "Draft";
        break;
      case DocumentStatus.Complete:
        result = "Complete";
        break;
      case DocumentStatus.Cancel:
        result = "Cancel";
        break;
    }

    return result;
  }
  // -----------------------------------------------------------
}
