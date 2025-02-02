import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../base/base.service';
import { Unit } from '../../models/lookup';
import { ApplicationContext } from '../../../application-context';
import { ServerResult } from '../../models/result';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService<Array<Unit>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'Lookup/GetUnit');
  }

  //-------------------------------------
  protected loadData() {

    let params = this.buildAPIParam_UserReference();

    this.post(params,
      result => {
        this.data = result.data;
      }, err => {
        console.log(err);
      });
  }
  //-------------------------------------
  public get ListUnit(): Array<Unit> {

    if (this.hasData) {
      return this.data;
      //return this.data.filter(item => item.UnitType==1);
    } else {
      return null;
    }
  }
  //-------------------------------------
  public get ListWeight(): Array<Unit> {

    if (this.hasData) {
      
      return this.data.filter(item => item.isWeightUnit);
    } else {
      return null;
    }

  }
  //-------------------------------------
  public getUnitFormName(name:string):number {
    let result: number = 0;

    for (let item of this.data) {
      if (item.UnitName.toUpperCase() == name.toUpperCase()) {
        result = item.ID;
        break;
      }
    }
    // ---------------------------------
    return result;

  }
  //-------------------------------------
  public getUnitNameFromUnitID(id: number, defaultValue: string = ''): string{

    let result = defaultValue;
    const idx = this.data.findIndex(u=>u.ID==id);

    if(idx>-1){
      result = this.data[idx].UnitName;
    }

    return result;
  }
  //-------------------------------------
  //public FindUnitByName(names: Array<string>, callback: Function) {

  //  let url = this.buildAPIURL("Lookup/FindUnitByName");
  //  let param = this.buildAPIParam_LookupFilterSet(names);

  //  let unitResult: Array<Unit> = new Array();

  //  this.postToURL(url, param,
  //    (result: ServerResult) => {

  //      if (Array.isArray(result.data) && result.data.length > 0) {
  //        unitResult.push(...result.data);
  //      }
  //      callback(unitResult);
  //    },
  //    (error: ServerResult) => {
  //      console.log('error : ' , error);
  //      callback(unitResult);
  //    }
  //  );

  //}
  //-------------------------------------
}
