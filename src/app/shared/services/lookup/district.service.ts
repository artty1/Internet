import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../base/base.service';
import { District } from '../../models/lookup';
import { ApplicationContext } from '../../../application-context';
import { API_LookupFilter } from '../../models/api-parameter';
import { ServerResult } from '../../models/result';
// import { trader_01 } from '../../data/mockup-trader';

@Injectable({
  providedIn: 'root'
})
export class DistrictService extends BaseService<Array<District>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'lookup/GetDistrict');
  }
  //-------------------------------------
  protected loadData(p:any=null) {

    let params = this.buildAPIParam_LookupFilter();
    // this.data.length = 0;
    // -----------------------------------------------------
    if (p != null) {

      if (p instanceof API_LookupFilter) {
        params.flag_something = p.flag_something;
        params.criteria = p.criteria;
      }else {
          params.flag_something = isNaN(p);
          params.criteria = p;        
      }
    }
    // -----------------------------------------------------
    this.post(params,
      (result:ServerResult) => {
        // this.data.push(...result.data);
        this.data = result.data;
      },
      (error:ServerResult) => {
        console.log('load district error : ', error);
      });
  }
  //-------------------------------------

}
