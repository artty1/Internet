import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationContext } from '../../../application-context';
import { BaseService } from './../../base/base.service';
import { Province } from '../../models/lookup';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends BaseService<Array<Province>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'lookup/GetProvince');
  }
  //-------------------------------------
  protected loadData() {

    this.post(this.buildAPIParam_LookupFilter(),
      (result) => {
        this.data = result.data;
      },
      (error) => {
        console.log('load province error : ', error);
    });
  }
  //-------------------------------------
}
