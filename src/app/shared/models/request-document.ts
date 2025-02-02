import { RequestDocumentType } from '../enums/request-type.enum';
// import { DocumentStatus } from '../enums/document-status.enum';
import { RequestFileInclude } from 'src/app/document-components/section-file-include/models';


// --------------------------------------------------------
export enum RenewReferenceCount{
  NoneRenew = 0,
  RenewFirst = 1,
  RenewMoreFirst = 2
}
export class RequestDocumentLogic {
  public requestType: RequestDocumentType = RequestDocumentType.NONE;
  public payment_method: string = '';

  public hasRenewReferenceCount: RenewReferenceCount = RenewReferenceCount.NoneRenew;
}
// --------------------------------------------------------
//export class FileInclude {
//  public ID: number;
//  public DOCUMENT_NAME: string;
//  public FILE_NAME: string;
//  public CREATE_USER: string;
//  public CREATE_DATE: Date;
//  public IsImage: boolean;
//}

export class PrintInclude {
    public ID: number;
    public SequenceNo: number;
    public IsCheck:boolean
    public Comment: string;
    // public item_01: boolean = false;
    // public item_02: boolean = false;
    // public item_03: boolean = false;
    // public item_04: boolean = false;
    // public item_05: boolean = false;
    // public item_06: boolean = false;
    // public item_07: boolean = false;
    // public item_08: boolean = false;
    // public item_09: boolean = false;
    // public item_10: string = "";
    constructor(sequenceNo:number=0, isCheck:boolean=false, comment:string="", id:number=0){
      this.ID = id;
      this.Comment = comment;
      this.IsCheck = isCheck;
      this.SequenceNo = sequenceNo;
    }
}


export class RequestDocument {

  public fileInclude: RequestFileInclude = new RequestFileInclude();
  //---------------------------------------
  public LogicOfDocument: RequestDocumentLogic = new RequestDocumentLogic();

  public PrintIncludeList: Array<PrintInclude> = new Array();
  public SubmitInfoHistory: Array<SubmitInfo> = new Array();


  public PersonOfCommittee: Array<number> = new Array();
  public PersonOfAttorney: Array<number> = new Array();
  public PersonOfOther: Array<number> = new Array();

  public Locations: Array<Location> = new Array();

  public Armament: Armament = new Armament();
  public ReferenceDocument: ReferenceDocument = new ReferenceDocument();
  public Consessions: Array<Consession> = new Array();
  //---------------------------------------
  public submit_message: string = '';
  //---------------------------------------
  public ID: number = 0;
  public RESTRICTED_GOODS_ID: number = 0;
  public TRADER_ID: number = 0;
  public REFERENCE_NO: string = '';
  public DOCUMENT_NO: string = '';
  public DOCUMENT_DATE: Date = null;
  public FOR_IMPORT: number = 0;
  public FOR_SAMPLE: number = 0;
  public FOR_PRODUCTION: number = 0;
  public FOR_OWNER: number = 0;
  public FOR_RENEW: number = 0;
  public FOR_SUBSTITUTE: number = 0;
  public FOR_EXPORT: number = 0;
  public FOR_CROSS_BORDER: number = 0;
  public FOR_EXPORT_SAMPLE: number = 0;
  public FOR_EXPORT_SPECIAL: number = 0;
  public FOR_TRUNCATE: number = 0;
  public REF_LICENSE_NO: string='';
  public REF_LICENSE_ISSUE_DATE: Date=null;
  public REF_LICENSE_EXPIRY_DATE: Date = null;
  public REF_LICENSE_IS_RENEW: number = 0;
  public REGISTER_NO: string = null;
  public REGISTER_DATE: Date = null;
  public REGISTER_USER: string = null;
  public OWNER_REF_LICENSE_TYPE: number=0;
  public LICENSE_INFORM_NO: string=null;
  public LICENSE_INFORM_DATE: Date=null;
  public IS_LOCK: number=0;
  public UNLOCK_DATE: Date=null;
  public UNLOCK_USER: string = null;
  public UNLOCK_DESCRIPTION: string = null;
  public IS_CANCELED: number=0;
  public CANCELED_DATE: Date = null;
  public CANCELED_USER: string = null;
  public NEXT_APPOINTMENT_DATE: string = null;
  public SIGNATURE_TYPE: string ='0';
  public SUB_SYSTEM_NO: number = 0;
  public LATEST_APPROVAL_DATE: Date = null;
  public LATEST_APPROVAL_STATUS: number = 0;
  public LATEST_APPROVAL_DESCRIPTION: string = null;
  public CHECKING_STATUS: string = null;
  public CHECKING_TIMESTAMP: string = null;
  public MESSAGE: string = null;
  public STATUS: number=0;
  public NOTE1: string = null;
  public CREATE_DATE: Date = new Date();
  public CREATE_USER: string = '';
  public UPDATE_DATE: Date = new Date();
  public UPDATE_USER: string = '';
  public XML_OWNER_TAX_NO: string = null;
  public XML_OWNER_NAME_PREFIX: string = null;
  public XML_OWNER_NAME: string = null;
  public XML_OWNER_SURNAME: string = null;
  public PAYMENT_STATUS: string = null;
  public PAYMENT_CHECKING_STATUS: string = null;
  public PAYMENT_METHOD: string = null;
  public RECEIVE_ID: number = 0;
  public PAYMENT_INFORM_ID: number = 0;
  public FAST_TRACK_PRIORITY: number = 0;
  public FAST_TRACK_UPD_USER: string = null;
  public LICENSE_REQ_TYPE: number = 1;
  public SUBMIT_STATUS: number = 0;
}

//export class T_T_LICENSE_REQ_INF {
export class PersonInviove {
  public ID: number = null;
  public LICENSE_REQ_ID: number = null;
  public TRADER_ID: number = null;
  public TRADER_PER_ID: number = null;
  public PERSON_TYPE: string = null;
  public NAME_PREFIX: string = null;
  public NAME: string = null;
  public SURNAME: string = null;
  public POSITION: string = null;
  public ADDRESS_NO: string = null;
  public BUILDING_NAME: string = null;
  public VILLAGE: string = null;
  public MOO: string = null;
  public SOI: string = null;
  public STREET: string = null;
  public DISTRICT_NAME: string = null;
  public SUB_PROVINCE_NAME: string = null;
  public PROVINCE_NAME: string = null;
  public POSTCODE: string = null;
  public PHONE_NO: string = null;
  public FAX_NO: string = null;
  public E_MAIL_ADDRESS: string = null;
  public ID_CARD_TYPE: number = null;
  public ID_CARD_NO: string = null;
  public ID_CARD_ISSUE_SUB_PROVINCE_NM: string = null;
  public ID_CARD_ISSUE_PROVINCE_NM: string = null;
  public ID_CARD_ISSUE_DATE: string = null;
  public ID_CARD_EXPIRY_DATE: string = null;
  public BIRTHDATE: string = null;
  public NATIONALITY_CODE: string = null;
  public BUSINESS_DESCRIPTION: string = null;
}

//export class PersonInvioveForDraft {
//  public ID: number = null;
//  public LICENSE_REQ_ID: number = null;
//  public TRADER_ID: number = null;
//  public TRADER_PER_ID: number = null;
//  public PERSON_TYPE: string = null;

//  public NAME: string = null;
//  public ADDRESS_NO: string = null;

//  public ID_CARD_TYPE: number = null;

//  public IsSelected: boolean = false;
//}

export class Location {
  //export class T_T_LICENSE_REQ_LOC {
  public ID: number = null;
  public LICENSE_REQ_ID: number=0;
  public TRADER_ID: number=0;
  public LOCATION_NAME: string = null;
  public ADDRESS_NO: string = null;
  public BUILDING_NAME: string = null;
  public VILLAGE: string = null;
  public MOO: string = null;
  public SOI: string = null;
  public STREET: string = null;
  public DISTRICT_NAME: string = null;
  public SUB_PROVINCE_NAME: string = null;
  public PROVINCE_NAME: string = null;
  public POSTCODE: string = null;
  public PHONE_NO: string = null;
  public FAX_NO: string = null;
  public E_MAIL_ADDRESS: string = null;
  public FOR_PRODUCTION: number = 0;
  public FOR_KEEPING: number =0;
  public NOTE1: string = null;
  public CREATE_DATE: Date = new Date();
  public CREATE_USER: string = '';
  public UPDATE_DATE: Date = new Date();
  public UPDATE_USER: string = '';
}

//export class T_T_LICENSE_REQ_DTL {
export class Armament {

  public ImportFromCounties: Array<string>;
  public ExportToCounties: Array<string>;
  //--------------------------------------------
  public Appendixs: Array<Appendix>;
  //--------------------------------------------
  public ProductGroupID: number;
  //--------------------------------------------
  public ID: number = 0;
  public LICENSE_REQ_ID: number = 0;
  public ITEM_NO: number = 0;
  public PRODUCT_CODE: string = null;
  public PRODUCT_NAME: string = '';
  public PRODUCT_BRAND_NAME: string = '';
  public PRODUCT_SERIES: string = null;
  public PRODUCT_DESCRIPTION: string = null;
  public TARIFF_CODE: string = null;
  public STATISTICAL_CODE: string = null;
  public REQUEST_QUANTITY: number = 0;
  public REQUEST_QUANTITY_UNIT_ID: number = 0;
  public REQUEST_WEIGHT: number = 0;
  public REQUEST_WEIGHT_UNIT_ID: number = 0;
  public QUANTITY: number = 0;
  public QUANTITY_UNIT_ID: number = 0;
  public PACKAGE: number = 0;
  public PACKAGE_UNIT_ID: number = 0;
  public WEIGHT: number = 0;
  public WEIGHT_UNIT_ID: number = 0;
  public CUSTOMS_QUANTITY_UNIT_CODE: string='';
  public CUSTOMS_WEIGHT_UNIT_CODE: string = '';
  public UNIT_PRICE: number=0;
  public TOTAL_PRICE: number=0;
  public CURRENCY_CODE: string = '';
  public OBJECTIVE: string = null;
  public OBJECTIVE_EXPORT_TYPE: string = null;
  public EXPLAIN_DOCUMENT_NO: string = null;
  public EXPLAIN_DOCUMENT_DATE: string = null;
  public CONSIGNOR_NAME: string = null;
  public CONSIGNOR_COUNTRY_CODE: string = null;
  public ORIGIN_COUNTRY_CODE: string = null;
  public CONSIGNEE_NAME: string = null;
  public CONSIGNEE_COUNTRY_CODE: string = null;
  public CROSS_IN_PORT: string = null;
  public CROSS_IN_PROVINCE_NM: string = null;
  public CROSS_IN_TRAN_TYPE: string = null;
  public CROSS_OUT_PORT: string = null;
  public CROSS_OUT_PROVINCE_NM: string = null;
  public CROSS_OUT_TRAN_TYPE: string = null;
  public NOTE1: string = null;
  public CREATE_DATE: Date = new Date();
  public CREATE_USER: string = '';
  public UPDATE_DATE: Date = new Date();
  public UPDATE_USER: string = '';

  public ORIGIN_NAME: string = '';
  //--------------------------------------------
  public constructor() {
    this.ImportFromCounties = new Array();
    this.ExportToCounties = new Array();
    this.Appendixs = new Array();
  }
}
//----------------------------------------------------------------------------------------
//export class T_T_LICENSE_REQ_DTL_IMCT {
//export class ImportFromCountry {
export class ToCountry {
  public ID: number = 0;
  public LICENSE_REQ_DTL_ID: number = 0;
  public COUNTRY_CODE: string = null;
  public CREATE_DATE: Date = new Date();
  public CREATE_USER: string = null;
  public UPDATE_DATE: Date = new Date();
  public UPDATE_USER: string = null;
}

//export class T_T_LICENSE_REQ_DTL_EXCT {
//export class ExportToCountry {
//  public ID: number = 0;
//  public LICENSE_REQ_DTL_ID: number = 0;
//  public COUNTRY_CODE: string = null;
//  public CREATE_DATE: Date = new Date();
//  public CREATE_USER: string = null;
//  public UPDATE_DATE: Date = new Date();
//  public UPDATE_USER: string = null;
//}

//export class T_T_LICENSE_REQ_DTL_APPEND {
//export class ArmamentDetail {
//  public ID: number = 0;
//  public LICENSE_REQ_DTL_ID: number = null;
//  public ITEM_NO: number = null;
//  public PRODUCT_NAME: string = null;
//  public PRODUCT_BRAND_NAME: string = null;
//  public PRODUCT_SERIES: string = null;
//  public PRODUCT_DESCRIPTION: string = null;
//  public TARIFF_CODE: string = null;
//  public STATISTICAL_CODE: string = null;
//  public QUANTITY: number = null;
//  public QUANTITY_UNIT_ID: number = null;
//  public CUSTOMS_QUANTITY_UNIT_CODE: string = null;
//  public WEIGHT: number = null;
//  public WEIGHT_UNIT_ID: number = null;
//  public CUSTOMS_WEIGHT_UNIT_CODE: string = null;
//  public UNIT_PRICE: number = null;
//  public TOTAL_PRICE: number = null;
//  public NOTE1: string = null;
//}

//export class T_T_LICENSE_REQ_DTL_EXP {
export class ReferenceDocument {
  //public PrintIncludeList: Array<PrintInclude> = new Array();
  public DetailsOfUsage: Array<UsageDetail> = new Array();

  public refLicenseQTYUnitText:string = '';
  public refLicenseWeightUnitText:string = '';
  public refHasLicenseQTYUnitText:string = '';
  public refHasLicenseWeightUnitText:string = '';

  public refLicenseID:number = 0;
  public refHasLicenseID:number = 0;

  public refRequestID:number = 0;
  public renewCount: number = 0;
  // ---------------------------------------------
  public ID: number = 0;
  public LICENSE_REQ_DTL_ID: number = 0;
  public PAGE_NO: number = 0;
  public REF_LICENSE_FORM_ID: number = 0;
  public REF_LICENSE_NO: string = null;
  public REF_LICENSE_ISSUE_DATE: Date = null;
  public REF_LICENSE_EXPIRY_DATE: Date= null;
  public REF_LICENSE_QTY: number = 0;
  public REF_LICENSE_QTY_UNIT_ID: number = 0;
  public REF_LICENSE_WT: number = 0;
  public REF_LICENSE_WT_UNIT_ID: number = 0;
  public REF_HAS_LICENSE_FORM_ID: number = 0;
  public REF_HAS_LICENSE_NO: string = '';
  public REF_HAS_LICENSE_ISSUE_DATE: Date = null;
  public REF_HAS_LICENSE_EXPIRY_DATE: Date= null;
  public REF_HAS_LICENSE_QTY: number = 0;
  public REF_HAS_LICENSE_QTY_UNIT_ID: number = 0;
  public REF_HAS_LICENSE_WT: number = 0;
  public REF_HAS_LICENSE_WT_UNIT_ID: number = 0;
  public REF_ADJUST_QTY: number = 0;
  public REF_ADJUST_QTY_UNIT_ID: number = 0;
  public REF_ADJUST_REASON: string = null;
  public IMPORT_COUNT_OF_YEAR: number = 0;
  public IMPORT_OF_YEAR: number = 0;
  public LAST_HAS_PRODUCT_NAME: string = '';
  public LAST_HAS_LICENSE_NO: string = '';
  public LAST_HAS_LICENSE_ISSUE_DATE: Date = null;
  public LAST_HAS_QUANTITY: number = 0;
  public LAST_HAS_QUANTITY_UNIT_ID: number = 0;
  public LAST_LICENSE_NO: string = null;
  public LAST_LICENSE_ISSUE_DATE: Date = null;
  public QUANTITY: number = 0;
  public GRADUAL_QUANTITY: number = 0;
  public ACTUAL_QUANTITY: number = 0;
  public REMAIN_QUANTITY: number = 0;                       public REMAIN_QUANTITY_DATE: Date = null;
  public QUANTITY_UNIT_ID: number = 0;
  public ACTUAL_WEIGHT: number = 0;
  public REMAIN_WEIGHT: number = 0;
  public WEIGHT_UNIT_ID: number = 0;
  public INVOICE_UNIT_PRICE: number = 0;
  public TRANSPORT_TYPE_NAME: string = '';
  public TRANSPORT_UNIT_PRICE: number = 0;
  public TRANSPORT_TOTAL_PRICE: number = 0;
  public TRANSPORT_COUNTRY_CODE: string = '';
  public TRANSPORT_COUNTRY_MORE: string = '';
  public TRANSPORT_BY_BOAT: number = 0;
  public TRANSPORT_BY_PLANE: number = 0;
  public TRANSPORT_BY_TRUCK: number = 0;
  public DELIVERY_TIME_TEXT: string = '';
  public TRANSIT_TIME: number = 0;
  public OTHER_COMPLEMENTARY: string = '';
  public TAX_RATE: number = 0;
  public UNIT_TAX: number = 0;
  public IS_PURE_INGREDIENT: number = 0;
  public INGREDIENT_DESCRIPTION: string = '';
  public IS_PRODUCTION_IN_COUNTRY: number = 0;
  public DOMESTIC_UNIT_PRICE: number = 0;
  public PRODUCTION_COMPANY: string = '';
  public PRODUCTION_TIME: number = 0;
  public REASON: string = '';
  public HAS_PRODUCTION_PROCESS_DOC: number = 0;
  public PRODUCTION_FUNCTION: string = '';
  public HAS_PLANT_LAYOUT: number = 0;
  public HAS_EXTERNAL_QA_DOC: number = 0;
  public EXTERNAL_QA_DOC_ISSUE_BY: string = '';
  public HAS_INTERNAL_QA_DOC: number = 0;
  public INTERNAL_QA_DOC_ISSUE_BY: string = '';
  public HAS_LINE_QA_DOC: number = 0;
  public LINE_QA_DOC_ISSUE_BY: string = '';
  public TESTING_QA_METHOD: number = 0;
  public TESTING_QA_DESCRIPTION: string = '';
  public HAS_TIS: number = 0;
  public HAS_TIS_SYMBOL: number = 0;
  public TIS_DESCRIPTION: string = '';
  public PRODUCTION_EXCEPTION: string = '';
  public PRODUCTION_CAPACITY_PERCENT: number = 0;
  public HAS_EXPAND_PRODUCTION_CAPACITY: number = 0;
  public EXPAND_PRODUCTION_CAPACITY_DES: string = '';
  public PACKAGING_MATERIAL: string = '';
  public HAS_PACKAGING_TOOL: number = 0;
  public PACKAGING_TOOL_DESCRIPTION: string = '';
  public HAS_SAFETY_SYSTEM: number = 0;
  public SAFETY_SYSTEM_DESCRIPTION: string = '';
  public HAS_STANDARD_SYMBOL: number = 0;
  public STANDARD_SYMBOL_DESCRIPTION: string = '';
  public HAS_PACKAGING_CERTIFICATE: number = 0;
  public PACKAGING_CERTIFICATE_ISSUE_BY: string = '';
  public HAS_TESTING_PACKAGING_TOOL: number = 0;
  public TESTING_PACKAGING_TOOL_DESCRIP: string = '';
  public HAS_OTHER_PRODUCT: number = 0;
  public OTHER_PRODUCT_DESCRIPTION: string = '';
  public HAS_SECURITY_TRAINING: number = 0;
  public SECURITY_TRAINING_DESCRIPTION: string = '';
  public OTHER_EXPLAINATION: string = '';
  public HAS_CUSTOMER_KNOWLEDGE: number = 0;
  public CUSTOMER_KNOWLEDGE_DESCRIPTION: string = '';
  public CAPACITY_QUANTITY_AVG: number = 0;
  public CAPACITY_QUANTITY_MAX: number = 0;
  public CAPACITY_QUANTITY_MIN: number = 0;
  public PO_NO: string = '';
  public PO_DATE: Date = null;
  public DOC_END_USER_NAME: string = '';
  public DOC_END_USER_DATE: Date = null;
  public EXPORT_START_TIME: Date = null;
  public EXPORT_END_TIME: Date = null;
  public NOTE1: string = '';
  public NOTE2: string = '';
  public NOTE3: string = '';
  public NOTE4: string = '';
  public NOTE5: string = '';
  public NOTE6: string = '';
  public RESTRICTED_GOODS_AMOUNT_THB: number = 0;
  public RESTRICTED_GOODS_AMOUNT_FOR: number = 0;
  public RGOODS_CURRENCY_CODE: string = '';
  public INVOICE_AMOUNT_THB: number = 0;
  public INVOICE_AMOUNT_FOR: number = 0;
  public INVOICE_CURRENCY_CODE: string = '';
  public DEPARTURE_DATE: Date = null;
  public ARRIVAL_DATE: Date = null;
  public INVOICE_NO: string = '';
  public INVOICE_DATE: Date = null;
  public INVOICE_ITEM_NO: number = 0;

  ////// https://app.clickup.com/t/860q67p23 //////////////////////
  public REF_EXPORT_LICENSE_FORM_ID: number = null;
  public REF_EXPORT_LICENSE_NO: string = null;
  public REF_EXPORT_LICENSE_ISSUE_DATE: Date = null;
  public REF_EXPORT_LICENSE_EXPIRY_DATE: Date  = null;
  public REF_EXPORT_LICENSE_QTY: number = 0;
  public REF_EXPORT_LICENSE_QTY_UNIT_ID: number = 0;
  public REF_EXPORT_LICENSE_WT: number = 0;
  public REF_EXPORT_LICENSE_WT_UNIT_ID: number = 0;
  ////// end of https://app.clickup.com/t/860q67p23 //////////////
}

//export class T_T_LICENSE_REQ_DTL_EXP_USE {
export class UsageDetail {

  constructor(
    public ID: number = 0,
    public LICENSE_REQ_DTL_EXP_ID: number = 0,
    public ITEM_NO: number = 0,
    public USE_DATE: Date = new Date(),
    public USE_QUANTITY: number = 0,
    public SALE_QUANTITY: number = 0,
    public REMAIN_QUANTITY: number = 0,
    public QUANTITY_UNIT_ID: number = 0,
    public IS_CURRENT_STOCK: number = 0
  ){

  }


}

export class SubmitInfo {

  // public submit_header:string = '';

  public ID: number = 0;
  public SUBMIT_TYPE: number = 0;
  public DOCUMENT_SUBMIT_ID: number = 0;
  public SUBMIT_DATE: Date = new Date();
  public SUBMIT_USER: string = '';
  public SUBMIT_COMMENT: string = '';
  public OFFICER_COMMENT_DATE: Date = null;
  public OFFICER_USER: string = '';
  public OFFICER_NAME: string = '';
  public OFFICER_COMMENT: string = '';
  public CREATE_DATE: Date = new Date();
  public CREATE_USER: string = '';
  public UPDATE_DATE: Date = new Date();
  public UPDATE_USER: string = '';
}

export class Appendix {
  public ID: number;
  public LICENSE_REQ_DTL_ID: number = 0;
  public ITEM_NO: number;
  public PRODUCT_NAME: string
  public PRODUCT_BRAND_NAME: string
  public PRODUCT_SERIES: string
  public PRODUCT_DESCRIPTION: string
  public TARIFF_CODE: string
  public STATISTICAL_CODE: string
  public QUANTITY: number = 0;
  public QUANTITY_UNIT_ID: number = 0;
  public CUSTOMS_QUANTITY_UNIT_CODE: string
  public WEIGHT: number = 0;
  public WEIGHT_UNIT_ID: number = 0;
  public CUSTOMS_WEIGHT_UNIT_CODE: string
  public UNIT_PRICE: number = 0;
  public TOTAL_PRICE: number = 0;
  public NOTE1: string
}

export class Consession {
  public ID: number = 0;
  public LICENSE_REQ_ID: number = 0;
  public DOCUMENT_NO: string = '';
  public DOCUMENT_DATE: Date = null;
  public CONTACT_INFO: string = '';
  public CREATE_DATE: Date = new Date();
  public CREATE_USER: string = '';
  public UPDATE_DATE: Date = new Date();
  public UPDATE_USER: string = '';
}
