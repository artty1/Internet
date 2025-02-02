import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../base/base.service';
import { ApplicationContext } from '../../../application-context';
import { Country } from '../../models/lookup';
import { ServerResult } from '../../models/result';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService<Array<Country>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'Lookup/GetCountry');

    this.refresh();
  }

  //-------------------------------------
  protected loadData() {
    let params = this.buildAPIParam_LookupFilter();

    // this.data.length = 0;

    this.post(params,
      (result:ServerResult) => {
        // this.data.push(...result.data);
        this.data = result.data;
      }, (err:ServerResult) => {
        console.log(err);
      });
  }
}
