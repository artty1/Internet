export class Country {
  public code: string;
  public name: string;
  public name_abbr: string;
  public isProhibit: boolean;
}
// ---------------------------------------------------
export class ProvinceSet {
  public PID: number;
  public COUNTRY_CODE: string;
  public AREA_CODE: string;
  public PROVINCE: string;
  public AMPHUR_ID: number;
  public AMPHUR: string;
  public TOMBON: string;
  public POST_CODE: string;
  public POST_ID: number;
}
// ---------------------------------------------------
export class Product {
  public Code: string;
  public Name: string;
  public QuantityUnitID: number;
  public QuantityUnitName: string;
  public WeightUnitID: number;
  public WeightUnitName: string;
  public CasNo: string;
  public DescriptionTH: string;
  public DescriptionEN: string;
  public GroupID: number;
  public GroupName: string;
  public TypeCode: string;
  public TypeName: string;
  public TariffCode: string;
  public StatisticCode: string;
}
// ---------------------------------------------------
export class Unit {
  public ID: number;
  public UnitName: string;
  public UnitType: number;
  public CustomUnitCode: string;

  public isWeightUnit: boolean;
}
// ---------------------------------------------------
export class Location {
  public ID: number;
  public LICENSE_REQ_ID: number;
  public TRADER_ID: number;
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
  public CREATE_DATE: Date;
  public CREATE_USER: string;
  public UPDATE_DATE: Date;
  public UPDATE_USER: string;

  }
// ---------------------------------------------------
export class ProductGroup {
  constructor(
    public ID: number=0,
    public Code: string='',
    public Name:string='',
    public TypeCode: string='',
    public TypeName: string='',
    public CasNo: string='',
    public TariffCode: string='',
    public StatisticalCode: string='',
    public UnitName: string=''
  ){

  }
}
// ---------------------------------------------------
// ---------------------------------------------------
export class Province {
  constructor(
    public id: number=0,
    public code: string='',
    public name: string=''
  ){

  }
}
// ---------------------------------------------------
export class District {
  constructor(
    public id: number=0,
    public province_id: number=0,
    public name: string=''
  ){

  }
}
// ---------------------------------------------------
export class SubDistrict {
  constructor(
    public id: number=0,
    public province_id: number=0,
    public district_id: number=0,
    public postcode: string='',
    public name: string=''
  ){

  }

}
// ---------------------------------------------------
export class Customs{
  constructor(
    public AreaCode: string='',
    public AreaName: string='',
    public GovernmentDocNo: string='',

    public Province:string = ''
  ){

  }
}
// ---------------------------------------------------
// ---------------------------------------------------
