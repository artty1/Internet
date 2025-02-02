import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../base/base.service';
import { SubDistrict } from '../../models/lookup';
import { ApplicationContext } from '../../../application-context';
import { API_LookupFilter } from '../../models/api-parameter';

@Injectable({
  providedIn: 'root'
})
export class SubdistrictService extends BaseService<Array<SubDistrict>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'lookup/GetSubDistrict');
  }
  //-------------------------------------
  protected loadData(p: any=null) {

    let params = this.buildAPIParam_LookupFilter();
    // -----------------------------------------------------
    if (p != null) {

      if (p instanceof API_LookupFilter) {
        params.flag_something = p.flag_something;
        params.criteria = p.criteria;
      } else {
        params.flag_something = isNaN(p);
        params.criteria = p;
      }
    }
    // -----------------------------------------------------
    this.post(params,
      (result) => {
        this.data = result.data;
      },
      (error) => {
        console.log('load subdistrict error : ', error);
      });
  }
  //-------------------------------------
}
