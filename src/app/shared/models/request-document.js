System.register(["../enums/request-type.enum"], function (exports_1, context_1) {
    "use strict";
    var request_type_enum_1, RequestDocumentLogic, PrintInclude, RequestDocument, PersonInviove, Location, Armament, ToCountry, ReferenceDocument, UsageDetail, SubmitInfo, Appendix, Consession;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (request_type_enum_1_1) {
                request_type_enum_1 = request_type_enum_1_1;
            }
        ],
        execute: function () {
            RequestDocumentLogic = /** @class */ (function () {
                function RequestDocumentLogic() {
                    this.requestType = request_type_enum_1.RequestDocumentType.NONE;
                    this.payment_method = '';
                }
                return RequestDocumentLogic;
            }());
            exports_1("RequestDocumentLogic", RequestDocumentLogic);
            // --------------------------------------------------------
            //export class FileInclude {
            //  public ID: number;
            //  public DOCUMENT_NAME: string;
            //  public FILE_NAME: string;
            //  public CREATE_USER: string;
            //  public CREATE_DATE: Date;
            //  public IsImage: boolean;
            //}
            PrintInclude = /** @class */ (function () {
                function PrintInclude() {
                }
                return PrintInclude;
            }());
            exports_1("PrintInclude", PrintInclude);
            // --------------------------------------------------------
            RequestDocument = /** @class */ (function () {
                function RequestDocument() {
                    //public FileIncludes: Array<FileInclude> = new Array();
                    //public PrintIncludeList: Array<PrintInclude> = new Array();
                    this.PrintIncludeList = new PrintInclude();
                    this.SubmitInfoHistory = new Array();
                    this.LogicOfDocument = new RequestDocumentLogic();
                    this.PersonOfCommittee = new Array();
                    this.PersonOfAttorney = new Array();
                    this.PersonOfOther = new Array();
                    this.Locations = new Array();
                    this.Armament = new Armament();
                    this.ReferenceDocument = new ReferenceDocument();
                    this.Consessions = new Array();
                    //---------------------------------------
                    this.ID = 0;
                    this.RESTRICTED_GOODS_ID = 0;
                    this.TRADER_ID = 0;
                    this.REFERENCE_NO = '';
                    this.DOCUMENT_NO = '';
                    this.DOCUMENT_DATE = null;
                    this.FOR_IMPORT = 0;
                    this.FOR_SAMPLE = 0;
                    this.FOR_PRODUCTION = 0;
                    this.FOR_OWNER = 0;
                    this.FOR_RENEW = 0;
                    this.FOR_SUBSTITUTE = 0;
                    this.FOR_EXPORT = 0;
                    this.FOR_CROSS_BORDER = 0;
                    this.FOR_EXPORT_SAMPLE = 0;
                    this.FOR_EXPORT_SPECIAL = 0;
                    this.FOR_TRUNCATE = 0;
                    this.REF_LICENSE_NO = '';
                    this.REF_LICENSE_ISSUE_DATE = null;
                    this.REF_LICENSE_EXPIRY_DATE = null;
                    this.REF_LICENSE_IS_RENEW = 0;
                    this.REGISTER_NO = null;
                    this.REGISTER_DATE = null;
                    this.REGISTER_USER = null;
                    this.OWNER_REF_LICENSE_TYPE = 0;
                    this.LICENSE_INFORM_NO = null;
                    this.LICENSE_INFORM_DATE = null;
                    this.IS_LOCK = 0;
                    this.UNLOCK_DATE = null;
                    this.UNLOCK_USER = null;
                    this.UNLOCK_DESCRIPTION = null;
                    this.IS_CANCELED = 0;
                    this.CANCELED_DATE = null;
                    this.CANCELED_USER = null;
                    this.NEXT_APPOINTMENT_DATE = null;
                    this.SIGNATURE_TYPE = '0';
                    this.SUB_SYSTEM_NO = 0;
                    this.LATEST_APPROVAL_DATE = null;
                    this.LATEST_APPROVAL_STATUS = 0;
                    this.LATEST_APPROVAL_DESCRIPTION = null;
                    this.CHECKING_STATUS = null;
                    this.CHECKING_TIMESTAMP = null;
                    this.MESSAGE = null;
                    this.STATUS = 0;
                    this.NOTE1 = null;
                    this.CREATE_DATE = new Date();
                    this.CREATE_USER = '';
                    this.UPDATE_DATE = new Date();
                    this.UPDATE_USER = '';
                    this.XML_OWNER_TAX_NO = null;
                    this.XML_OWNER_NAME_PREFIX = null;
                    this.XML_OWNER_NAME = null;
                    this.XML_OWNER_SURNAME = null;
                    this.PAYMENT_STATUS = null;
                    this.PAYMENT_CHECKING_STATUS = null;
                    this.PAYMENT_METHOD = null;
                    this.RECEIVE_ID = 0;
                    this.PAYMENT_INFORM_ID = 0;
                    this.FAST_TRACK_PRIORITY = 0;
                    this.FAST_TRACK_UPD_USER = null;
                    this.LICENSE_REQ_TYPE = 1;
                    this.SUBMIT_STATUS = 0;
                }
                return RequestDocument;
            }());
            exports_1("RequestDocument", RequestDocument);
            //export class T_T_LICENSE_REQ_INF {
            PersonInviove = /** @class */ (function () {
                function PersonInviove() {
                    this.ID = null;
                    this.LICENSE_REQ_ID = null;
                    this.TRADER_ID = null;
                    this.TRADER_PER_ID = null;
                    this.PERSON_TYPE = null;
                    this.NAME_PREFIX = null;
                    this.NAME = null;
                    this.SURNAME = null;
                    this.POSITION = null;
                    this.ADDRESS_NO = null;
                    this.BUILDING_NAME = null;
                    this.VILLAGE = null;
                    this.MOO = null;
                    this.SOI = null;
                    this.STREET = null;
                    this.DISTRICT_NAME = null;
                    this.SUB_PROVINCE_NAME = null;
                    this.PROVINCE_NAME = null;
                    this.POSTCODE = null;
                    this.PHONE_NO = null;
                    this.FAX_NO = null;
                    this.E_MAIL_ADDRESS = null;
                    this.ID_CARD_TYPE = null;
                    this.ID_CARD_NO = null;
                    this.ID_CARD_ISSUE_SUB_PROVINCE_NM = null;
                    this.ID_CARD_ISSUE_PROVINCE_NM = null;
                    this.ID_CARD_ISSUE_DATE = null;
                    this.ID_CARD_EXPIRY_DATE = null;
                    this.BIRTHDATE = null;
                    this.NATIONALITY_CODE = null;
                    this.BUSINESS_DESCRIPTION = null;
                }
                return PersonInviove;
            }());
            exports_1("PersonInviove", PersonInviove);
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
            Location = /** @class */ (function () {
                function Location() {
                    //export class T_T_LICENSE_REQ_LOC {
                    this.ID = null;
                    this.LICENSE_REQ_ID = 0;
                    this.TRADER_ID = 0;
                    this.LOCATION_NAME = null;
                    this.ADDRESS_NO = null;
                    this.BUILDING_NAME = null;
                    this.VILLAGE = null;
                    this.MOO = null;
                    this.SOI = null;
                    this.STREET = null;
                    this.DISTRICT_NAME = null;
                    this.SUB_PROVINCE_NAME = null;
                    this.PROVINCE_NAME = null;
                    this.POSTCODE = null;
                    this.PHONE_NO = null;
                    this.FAX_NO = null;
                    this.E_MAIL_ADDRESS = null;
                    this.FOR_PRODUCTION = 0;
                    this.FOR_KEEPING = 0;
                    this.NOTE1 = null;
                    this.CREATE_DATE = new Date();
                    this.CREATE_USER = '';
                    this.UPDATE_DATE = new Date();
                    this.UPDATE_USER = '';
                }
                return Location;
            }());
            exports_1("Location", Location);
            //export class T_T_LICENSE_REQ_DTL { 
            Armament = /** @class */ (function () {
                function Armament() {
                    //--------------------------------------------
                    this.ID = 0;
                    this.LICENSE_REQ_ID = 0;
                    this.ITEM_NO = 0;
                    this.PRODUCT_CODE = null;
                    this.PRODUCT_NAME = '';
                    this.PRODUCT_BRAND_NAME = '';
                    this.PRODUCT_SERIES = null;
                    this.PRODUCT_DESCRIPTION = null;
                    this.TARIFF_CODE = null;
                    this.STATISTICAL_CODE = null;
                    this.REQUEST_QUANTITY = 0;
                    this.REQUEST_QUANTITY_UNIT_ID = 0;
                    this.REQUEST_WEIGHT = 0;
                    this.REQUEST_WEIGHT_UNIT_ID = 0;
                    this.QUANTITY = 0;
                    this.QUANTITY_UNIT_ID = 0;
                    this.PACKAGE = 0;
                    this.PACKAGE_UNIT_ID = 0;
                    this.WEIGHT = 0;
                    this.WEIGHT_UNIT_ID = 0;
                    this.CUSTOMS_QUANTITY_UNIT_CODE = '';
                    this.CUSTOMS_WEIGHT_UNIT_CODE = '';
                    this.UNIT_PRICE = 0;
                    this.TOTAL_PRICE = 0;
                    this.CURRENCY_CODE = '';
                    this.OBJECTIVE = null;
                    this.OBJECTIVE_EXPORT_TYPE = null;
                    this.EXPLAIN_DOCUMENT_NO = null;
                    this.EXPLAIN_DOCUMENT_DATE = null;
                    this.CONSIGNOR_NAME = null;
                    this.CONSIGNOR_COUNTRY_CODE = null;
                    this.ORIGIN_COUNTRY_CODE = null;
                    this.CONSIGNEE_NAME = null;
                    this.CONSIGNEE_COUNTRY_CODE = null;
                    this.CROSS_IN_PORT = null;
                    this.CROSS_IN_PROVINCE_NM = null;
                    this.CROSS_IN_TRAN_TYPE = null;
                    this.CROSS_OUT_PORT = null;
                    this.CROSS_OUT_PROVINCE_NM = null;
                    this.CROSS_OUT_TRAN_TYPE = null;
                    this.NOTE1 = null;
                    this.CREATE_DATE = new Date();
                    this.CREATE_USER = '';
                    this.UPDATE_DATE = new Date();
                    this.UPDATE_USER = '';
                    this.ImportFromCounties = new Array();
                    this.ImportFromCounties.push('');
                    this.ImportFromCounties.push('');
                    this.ImportFromCounties.push('');
                    this.ExportToCounties = new Array();
                    this.ExportToCounties.push('');
                    this.ExportToCounties.push('');
                    this.ExportToCounties.push('');
                    this.Appendixs = new Array();
                }
                return Armament;
            }());
            exports_1("Armament", Armament);
            //export class T_T_LICENSE_REQ_DTL_IMCT {
            //export class ImportFromCountry {
            ToCountry = /** @class */ (function () {
                function ToCountry() {
                    this.ID = 0;
                    this.LICENSE_REQ_DTL_ID = 0;
                    this.COUNTRY_CODE = null;
                    this.CREATE_DATE = new Date();
                    this.CREATE_USER = null;
                    this.UPDATE_DATE = new Date();
                    this.UPDATE_USER = null;
                }
                return ToCountry;
            }());
            exports_1("ToCountry", ToCountry);
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
            ReferenceDocument = /** @class */ (function () {
                function ReferenceDocument() {
                    this.PrintIncludeList = new Array();
                    this.DetailsOfUsage = new Array();
                    // ---------------------------------------------
                    this.ID = 0;
                    this.LICENSE_REQ_DTL_ID = 0;
                    this.PAGE_NO = 0;
                    this.REF_LICENSE_FORM_ID = 0;
                    this.REF_LICENSE_NO = null;
                    this.REF_LICENSE_ISSUE_DATE = null;
                    this.REF_LICENSE_EXPIRY_DATE = null;
                    this.REF_LICENSE_QTY = 0;
                    this.REF_LICENSE_QTY_UNIT_ID = 0;
                    this.REF_LICENSE_WT = 0;
                    this.REF_LICENSE_WT_UNIT_ID = 0;
                    this.REF_HAS_LICENSE_FORM_ID = 0;
                    this.REF_HAS_LICENSE_NO = '';
                    this.REF_HAS_LICENSE_ISSUE_DATE = null;
                    this.REF_HAS_LICENSE_EXPIRY_DATE = null;
                    this.REF_HAS_LICENSE_QTY = 0;
                    this.REF_HAS_LICENSE_QTY_UNIT_ID = 0;
                    this.REF_HAS_LICENSE_WT = 0;
                    this.REF_HAS_LICENSE_WT_UNIT_ID = 0;
                    this.REF_ADJUST_QTY = 0;
                    this.REF_ADJUST_QTY_UNIT_ID = 0;
                    this.REF_ADJUST_REASON = null;
                    this.IMPORT_COUNT_OF_YEAR = 0;
                    this.IMPORT_OF_YEAR = 0;
                    this.LAST_HAS_PRODUCT_NAME = '';
                    this.LAST_HAS_LICENSE_NO = '';
                    this.LAST_HAS_LICENSE_ISSUE_DATE = null;
                    this.LAST_HAS_QUANTITY = 0;
                    this.LAST_HAS_QUANTITY_UNIT_ID = 0;
                    this.LAST_LICENSE_NO = null;
                    this.LAST_LICENSE_ISSUE_DATE = null;
                    this.QUANTITY = 0;
                    this.GRADUAL_QUANTITY = 0;
                    this.ACTUAL_QUANTITY = 0;
                    this.REMAIN_QUANTITY = 0;
                    this.QUANTITY_UNIT_ID = 0;
                    this.ACTUAL_WEIGHT = 0;
                    this.REMAIN_WEIGHT = 0;
                    this.WEIGHT_UNIT_ID = 0;
                    this.INVOICE_UNIT_PRICE = 0;
                    this.TRANSPORT_TYPE_NAME = '';
                    this.TRANSPORT_UNIT_PRICE = 0;
                    this.TRANSPORT_TOTAL_PRICE = 0;
                    this.TRANSPORT_COUNTRY_CODE = '';
                    this.TRANSPORT_COUNTRY_MORE = '';
                    this.TRANSPORT_BY_BOAT = 0;
                    this.TRANSPORT_BY_PLANE = 0;
                    this.TRANSPORT_BY_TRUCK = 0;
                    this.DELIVERY_TIME_TEXT = '';
                    this.TRANSIT_TIME = 0;
                    this.OTHER_COMPLEMENTARY = '';
                    this.TAX_RATE = 0;
                    this.UNIT_TAX = 0;
                    this.IS_PURE_INGREDIENT = 0;
                    this.INGREDIENT_DESCRIPTION = '';
                    this.IS_PRODUCTION_IN_COUNTRY = 0;
                    this.DOMESTIC_UNIT_PRICE = 0;
                    this.PRODUCTION_COMPANY = '';
                    this.PRODUCTION_TIME = 0;
                    this.REASON = '';
                    this.HAS_PRODUCTION_PROCESS_DOC = 0;
                    this.PRODUCTION_FUNCTION = '';
                    this.HAS_PLANT_LAYOUT = 0;
                    this.HAS_EXTERNAL_QA_DOC = 0;
                    this.EXTERNAL_QA_DOC_ISSUE_BY = '';
                    this.HAS_INTERNAL_QA_DOC = 0;
                    this.INTERNAL_QA_DOC_ISSUE_BY = '';
                    this.HAS_LINE_QA_DOC = 0;
                    this.LINE_QA_DOC_ISSUE_BY = '';
                    this.TESTING_QA_METHOD = 0;
                    this.TESTING_QA_DESCRIPTION = '';
                    this.HAS_TIS = 0;
                    this.HAS_TIS_SYMBOL = 0;
                    this.TIS_DESCRIPTION = '';
                    this.PRODUCTION_EXCEPTION = '';
                    this.PRODUCTION_CAPACITY_PERCENT = 0;
                    this.HAS_EXPAND_PRODUCTION_CAPACITY = 0;
                    this.EXPAND_PRODUCTION_CAPACITY_DES = '';
                    this.PACKAGING_MATERIAL = '';
                    this.HAS_PACKAGING_TOOL = 0;
                    this.PACKAGING_TOOL_DESCRIPTION = '';
                    this.HAS_SAFETY_SYSTEM = 0;
                    this.SAFETY_SYSTEM_DESCRIPTION = '';
                    this.HAS_STANDARD_SYMBOL = 0;
                    this.STANDARD_SYMBOL_DESCRIPTION = '';
                    this.HAS_PACKAGING_CERTIFICATE = 0;
                    this.PACKAGING_CERTIFICATE_ISSUE_BY = '';
                    this.HAS_TESTING_PACKAGING_TOOL = 0;
                    this.TESTING_PACKAGING_TOOL_DESCRIP = '';
                    this.HAS_OTHER_PRODUCT = 0;
                    this.OTHER_PRODUCT_DESCRIPTION = '';
                    this.HAS_SECURITY_TRAINING = 0;
                    this.SECURITY_TRAINING_DESCRIPTION = '';
                    this.OTHER_EXPLAINATION = '';
                    this.HAS_CUSTOMER_KNOWLEDGE = 0;
                    this.CUSTOMER_KNOWLEDGE_DESCRIPTION = '';
                    this.CAPACITY_QUANTITY_AVG = 0;
                    this.CAPACITY_QUANTITY_MAX = 0;
                    this.CAPACITY_QUANTITY_MIN = 0;
                    this.PO_NO = '';
                    this.PO_DATE = null;
                    this.DOC_END_USER_NAME = '';
                    this.DOC_END_USER_DATE = null;
                    this.EXPORT_START_TIME = null;
                    this.EXPORT_END_TIME = null;
                    this.NOTE1 = '';
                    this.NOTE2 = '';
                    this.NOTE3 = '';
                    this.NOTE4 = '';
                    this.NOTE5 = '';
                    this.NOTE6 = '';
                    this.RESTRICTED_GOODS_AMOUNT_THB = 0;
                    this.RESTRICTED_GOODS_AMOUNT_FOR = 0;
                    this.RGOODS_CURRENCY_CODE = '';
                    this.INVOICE_AMOUNT_THB = 0;
                    this.INVOICE_AMOUNT_FOR = 0;
                    this.INVOICE_CURRENCY_CODE = '';
                    this.DEPARTURE_DATE = null;
                    this.ARRIVAL_DATE = null;
                    this.INVOICE_NO = '';
                    this.INVOICE_DATE = null;
                    this.INVOICE_ITEM_NO = 0;
                }
                return ReferenceDocument;
            }());
            exports_1("ReferenceDocument", ReferenceDocument);
            //export class T_T_LICENSE_REQ_DTL_EXP_USE {
            UsageDetail = /** @class */ (function () {
                function UsageDetail() {
                    this.ID = 0;
                    this.LICENSE_REQ_DTL_EXP_ID = 0;
                    this.ITEM_NO = 0;
                    this.USE_DATE = new Date();
                    this.USE_QUANTITY = 0;
                    this.SALE_QUANTITY = 0;
                    this.REMAIN_QUANTITY = 0;
                    this.QUANTITY_UNIT_ID = 0;
                    this.IS_CURRENT_STOCK = 0;
                }
                return UsageDetail;
            }());
            exports_1("UsageDetail", UsageDetail);
            SubmitInfo = /** @class */ (function () {
                function SubmitInfo() {
                    this.ID = 0;
                    this.SUBMIT_TYPE = 0;
                    this.DOCUMENT_SUBMIT_ID = 0;
                    this.SUBMIT_DATE = new Date();
                    this.SUBMIT_USER = '';
                    this.SUBMIT_COMMENT = '';
                    this.OFFICER_COMMENT_DATE = null;
                    this.OFFICER_USER = '';
                    this.OFFICER_NAME = '';
                    this.OFFICER_COMMENT = '';
                    this.CREATE_DATE = new Date();
                    this.CREATE_USER = '';
                    this.UPDATE_DATE = new Date();
                    this.UPDATE_USER = '';
                }
                return SubmitInfo;
            }());
            exports_1("SubmitInfo", SubmitInfo);
            Appendix = /** @class */ (function () {
                function Appendix() {
                    this.LICENSE_REQ_DTL_ID = 0;
                    this.QUANTITY = 0;
                    this.QUANTITY_UNIT_ID = 0;
                    this.WEIGHT = 0;
                    this.WEIGHT_UNIT_ID = 0;
                    this.UNIT_PRICE = 0;
                    this.TOTAL_PRICE = 0;
                }
                return Appendix;
            }());
            exports_1("Appendix", Appendix);
            Consession = /** @class */ (function () {
                function Consession() {
                    this.ID = 0;
                    this.LICENSE_REQ_ID = 0;
                    this.DOCUMENT_NO = '';
                    this.DOCUMENT_DATE = null;
                    this.CONTACT_INFO = '';
                    this.CREATE_DATE = new Date();
                    this.CREATE_USER = '';
                    this.UPDATE_DATE = new Date();
                    this.UPDATE_USER = '';
                }
                return Consession;
            }());
            exports_1("Consession", Consession);
        }
    };
});
//# sourceMappingURL=request-document.js.map