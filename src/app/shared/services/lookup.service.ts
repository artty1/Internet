import { Injectable } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { HttpClient } from '@angular/common/http';
import { LookupData } from '../models/result';
import { BaseService } from './../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService extends BaseService<Array<LookupData>> {

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, '');
  }

}
