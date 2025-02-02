import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationContext } from 'src/app/application-context';
import { BaseService } from '../../base/base.service';
import { Country, Customs } from '../../models/lookup';
import { ServerResult } from '../../models/result';

@Injectable({
  providedIn: 'root'
})
export class CustomsService extends BaseService<Array<Customs>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'Lookup/GetCustoms');

    this.refresh();
  }

  //-------------------------------------
  protected loadData() {
    let params = this.buildAPIParam_LookupFilter();

    this.post(params,
      (result:ServerResult) => {
        // console.log('loadData Customs :', result.data);
        this.data = result.data;
      }, (err:ServerResult) => {
        console.log(err);
      });
  }
  //-------------------------------------

  //-------------------------------------
}
