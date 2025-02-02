import { Injectable } from '@angular/core';
import { BaseService, DataSourceMethod } from './../../base/base.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationContext } from '../../../application-context';
import { Product } from '../../models/lookup';
import { ServerResult } from '../../models/result';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Array<Product>> {


  private gid: number = 0;
  // private filter: string = "";


  constructor(protected app:ApplicationContext, protected http:HttpClient) {
    super(app, http, '');

    this.data = new Array();

  }
  //-------------------------------------
  public get CurrentGroupID(): number {
    return this.gid;
  }
  public set CurrentGroupID(value: number) {
    // this.filter = "";
    this.gid = value;
  }
  //-------------------------------------
  // public get CurrentFilter(): string {
  //   return this.filter;
  // }
  // public set CurrentFilter(value: string) {
  //   this.gid = 0;
  //   this.filter = value;
  // }
  //-------------------------------------
  protected loadData(p: any = null) {

    let url = this.buildAPIURL('lookup/GetAllProduct');
    let params = this.buildAPIParam_LookupFilter();

    params.criteria = "";

    this.postToURL(url, params,
      (result:ServerResult) => {
        // console.log('load product by group : ', result.data);
        // this.data.length = 0;
        // this.data.push(...result.data);
        this.data = result.data;
        this.clearNullValue();
        
      }, (err:ServerResult) => {
        console.log(err);
      });
  }
  //-------------------------------------
  private clearNullValue(){
    this.data.forEach((item:Product)=>{
      if(item.QuantityUnitName == null) item.QuantityUnitName = "";
      if(item.WeightUnitName == null) item.WeightUnitName = "";
      if(item.CasNo == null) item.CasNo = "";
      if(item.TariffCode == null) item.TariffCode = "";
      if(item.StatisticCode == null) item.StatisticCode = "";
    });
  }
  //------------------------------------- 
  public getProductDetail(code:string) {
    return this.getDataFromDataSource("Code", code);
  }
  //-------------------------------------
  public Search(code:string) {

   let params = this.buildAPIParam_LookupFilter(code);
   let url = this.buildAPIURL("lookup/GetProduct");

   console.log("search product !!!");

   this.postToURL(url, params,
     result => {
       console.log("Search : ", result);
     },
     error => {
      console.error("Error Search : ", error);
     })



  }

  //-------------------------------------
  public filter(field_name:string, criteria:string):Array<Product>{
  // public filterData(criteria: string = ""): Array<Product> {

    criteria = criteria.trim();

    if(criteria.length == 0){
      return this.Datasource;
    }
    // -------------------------------------
    field_name = field_name.trim();

    if(field_name.length==0){

      return this.data.filter(item => {
        let result:boolean = (
          (item.Name.indexOf(criteria) > -1) ||
          (item.CasNo.indexOf(criteria) > -1) ||
          (item.DescriptionTH.indexOf(criteria) > -1) ||
          (item.DescriptionTH.indexOf(criteria) > -1) ||
          (item.TypeCode.indexOf(criteria) > -1) ||
          (item.TypeName.indexOf(criteria) > -1) ||
          (item.GroupName.indexOf(criteria) > -1) ||
          (item.StatisticCode.indexOf(criteria) > -1) ||
          (item.TariffCode.indexOf(criteria) > -1)
        );

        return result;
      });

    }else{

      return this.Datasource.filter((item:Product)=>{
        return (item[field_name].indexOf(criteria) > -1);
      });

    }
  }
  //------------------------------------
  
}
