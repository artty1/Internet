import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../base/base.service';
import { ApplicationContext } from '../../../application-context';
import { Location } from '../../models/lookup';
import { ServerResult } from '../../models/result';




@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService<Array<Location>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'Lookup/GetLocation');

    this.data = new Array();
  }

  //-------------------------------------
  protected loadData() {

    let params = this.buildAPIParam_UserReference();

    this.data.length = 0;

    this.post(params,
      (result:ServerResult) => {
        this.data = result.data;
        // this.data.push(...result.data);
      }, (err:ServerResult) => {
        console.log(err);
      });

  }
}
