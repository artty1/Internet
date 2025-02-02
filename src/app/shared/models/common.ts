export class Trader {
  public people: Array<Person>;
  public address: Array<Address>;

  public isExpire: boolean;
  ////--------------------------------------
  //--------------------------------------
  public ID: number;
  public DOCUMENT_NO: string;
  public DOCUMENT_DATE: Date
  public DOCUMENT_EXPIRY_DATE: Date
  public TRADER_TAX_NO: string;
  public TRADER_BRANCH_NO: number;
  public TRADER_NAME_PREFIX: string;
  public TRADER_NAME: string;
  public TRADER_SURNAME: string;
  public TRADER_TYPE: number
  public REGISTER_SUB_PROVINCE_NAME: string;
  public REGISTER_PROVINCE_NAME: string;
  public REGISTER_DATE
  public REGISTER_NO: string;
  public ADDRESS_NO: string;
  public BUILDING_NAME: string;
  public VILLAGE: string;
  public MOO: string;
  public SOI: string;
  public STREET: string;
  public DISTRICT_NAME: string;
  public SUB_PROVINCE_NAME: string;
  public PROVINCE_NAME: string;
  public POSTCODE: string;
  public PHONE_NO: string;
  public FAX_NO: string;
  public E_MAIL_ADDRESS: string;
  public BUSINESS_DESCRIPTION: string;
  public CAPITAL_AMOUNT: number;
  public NOTE1: string;
  public CREATE_DATE: Date;
  public CREATE_USER: string;
  public UPDATE_DATE: Date;
  public UPDATE_USER: string;
  public USE_EXP_RESTRICTED_GOODS: number;
  public USE_IMP_RESTRICTED_GOODS: number;

}

export class Person {
  public ID: number;
  public TRADER_ID: number;
  public PERSON_NO: number;
  public PERSON_TYPE: string;
  public PERSON_NAME_PREFIX: string;
  public PERSON_NAME: string;
  public PERSON_SURNAME: string;
  public PERSON_POSITION: string;
  public ID_CARD_TYPE: number;
  public ID_CARD_NO: string;
  public ID_CARD_ISSUE_SUB_PROVINCE_NM: string;
  public ID_CARD_ISSUE_PROVINCE_NM: string;
  public ID_CARD_ISSUE_DATE: Date;
  public ID_CARD_EXPIRY_DATE: Date;
  public BIRTHDATE: Date;
  public NATIONALITY_CODE: string;
  public ADDRESS_NO: string;
  public BUILDING_NAME: string;
  public VILLAGE: string;
  public MOO: string;
  public SOI: string;
  public STREET: string;
  public DISTRICT_NAME: string;
  public SUB_PROVINCE_NAME: string;
  public PROVINCE_NAME: string;
  public COUNTRY_CODE: string;
  public POSTCODE: string;
  public PHONE_NO: string;
  public FAX_NO: string;
  public E_MAIL_ADDRESS: string;
  public NOTE1: string;
  public IS_ACTIVE: number;
  public CREATE_DATE: Date;
  public CREATE_USER: string;
  public UPDATE_DATE: Date;
  public UPDATE_USER: string;
}

export class Address {
  public ID: number;
  public TRADER_ID: number;
  public LOCATION_NO: number;
  public LOCATION_NAME: string;
  public ADDRESS_NO: string;
  public BUILDING_NAME: string;
  public VILLAGE: string;
  public MOO: string;
  public SOI: string;
  public STREET: string;
  public DISTRICT_NAME: string;
  public SUB_PROVINCE_NAME: string;
  public PROVINCE_NAME: string;
  public POSTCODE: string;
  public PHONE_NO: string;
  public FAX_NO: string;
  public E_MAIL_ADDRESS: string;
  public FOR_PRODUCTION: number;
  public FOR_KEEPING: number;
  public NOTE1: string;
  public IS_ACTIVE: boolean;
  public CREATE_DATE: Date;
  public CREATE_USER: string;
  public UPDATE_DATE: Date;
  public UPDATE_USER: string;

  public constructor() {
    this.ID = 0;
    this.TRADER_ID = 0;
    this.LOCATION_NO = 0;
    this.LOCATION_NAME = '';
    this.ADDRESS_NO = '';
    this.BUILDING_NAME = '';
    this.VILLAGE = '';
    this.MOO = '';
    this.SOI = '';
    this.STREET = '';
    this.DISTRICT_NAME = '';
    this.SUB_PROVINCE_NAME = '';
    this.PROVINCE_NAME = '';
    this.POSTCODE = '';
    this.PHONE_NO = '';
    this.FAX_NO = '';
    this.E_MAIL_ADDRESS = '';
    this.FOR_PRODUCTION = 0;
    this.FOR_KEEPING = 0;
    this.NOTE1 = '';
    this.IS_ACTIVE = true;
    this.CREATE_DATE = new Date();
    this.CREATE_USER = '';
    this.UPDATE_DATE = new Date();
    this.UPDATE_USER = ''; 
  }

}
