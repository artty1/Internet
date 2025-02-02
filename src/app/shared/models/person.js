//import { AddressModel } from './address';
//import { ContactModel } from './contact';
//import * as moment from 'moment';
////---------------------------------------------------
//export class PersonModel {
//  public taxID: string;
//  public prefixName: string;
//  public firstName: string;
//  //public middleName: string;
//  public lastName: string;
//  //public address: AddressModel;
//  public addressNo: string;
//  public addressMoo: string;
//  public addressBuilding: string;
//  public addressVillage: string;
//  public addressSoi: string;
//  public addressStreet: string;
//  public addressSubDistrict: string;
//  public addressDistrict: string;
//  public addressProvince: string;
//  public addressZipcode: string;
//  public personName: string;
//  public phone: string;
//  public fax: string;
//  public email: string;
//}
////---------------------------------------------------
//export class PersonModelForGrid {
//  public taxID: string;
//  public prefixName: string;
//  public firstName: string;
//  public lastName: string;
//  public birthday: Date;
//  //public address: AddressModel;
//  public addressNo: string;
//  public addressMoo: string;
//  public addressBuilding: string;
//  public addressVillage: string;
//  public addressSoi: string;
//  public addressStreet: string;
//  public addressSubDistrict: string;
//  public addressDistrict: string;
//  public addressProvince: string;
//  public addressZipcode: string;
//  public phone: string;
//  public fax: string;
//  public email: string;
//  //-----------------------------------
//  public get age(): string {
//    let age = moment().diff(this.birthday, 'years');
//    return age+' ปี';
//  }
//  //-----------------------------------
//  public get fullname(): string {
//    let result = this.prefixName+' '+this.firstName+' '+this.lastName;
//    return result;
//  }
//  //-----------------------------------
//  public get address(): string {
//    return this.addressNo + ' ' + this.addressMoo + ' ' + this.addressSoi + ' ' + this.addressStreet + ' ' + this.addressSubDistrict + ' ' + this.addressDistrict + ' ' + this.addressProvince + ' ' + this.addressZipcode;
//  }
//  //-----------------------------------
//}
//# sourceMappingURL=person.js.map