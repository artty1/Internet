import { Injectable } from '@angular/core';
import { BaseService, DataSourceMethod } from './../../base/base.service';
import { ApplicationContext } from '../../../application-context';
import { HttpClient } from '@angular/common/http';
import { ProductGroup } from '../../models/lookup';
import { ServerResult } from '../../models/result';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService extends BaseService<Array<ProductGroup>> {

  public criteria: string;

  constructor(protected app: ApplicationContext, protected http: HttpClient) {
    super(app, http, 'lookup/GetProductGroup');
    this.criteria = "";
    this.data = new Array();
  }
  //-------------------------------------
  public get Datasource(): Array<ProductGroup>  {

    return this.data;

    // if (this.criteria.trim().length > 0) {
    //   return this.filterData();
    // } else {
    //   return this.data;
    // }

  }
  //-------------------------------------
  // private filterData(): Array<ProductGroup> {

  //   let c = this.criteria;

  //   if (c.trim().length == 0) {
  //     return this.data;
  //   } else {

  //     return this.data.filter(item => {
  //       let result = (
  //         (item.Name.indexOf(c) > -1) ||
  //         (item.CasNo.indexOf(c) > -1) ||
  //         (item.StatisticalCode.indexOf(c) > -1) ||
  //         (item.TariffCode.indexOf(c) > -1) ||
  //         (item.TypeCode.indexOf(c) > -1) ||
  //         (item.TypeName.indexOf(c) > -1) ||
  //         (item.UnitName.indexOf(c) > -1)
  //       );

  //       return result;
  //     });

  //   }
  // }
  //-------------------------------------
  protected loadData() {
    let params = this.buildAPIParam_LookupFilter();

    this.data.length = 0;

    this.post(params,
      (result:ServerResult) => {
        this.data.push(...result.data);
        this.clearAllNullValue();
      }, (err:ServerResult) => {
        console.log(err);
      });
  }
  // --------------------------------------------
  public getProductGroupDetail(id: number): ProductGroup {
    return this.getDataFromDataSource("ID", id);
  }
  // --------------------------------------------
  private clearAllNullValue():void{

    this.data.forEach((item:ProductGroup)=>{

          if(item.CasNo == null) item.CasNo = "";
          if(item.StatisticalCode == null) item.StatisticalCode = "";
          if(item.TariffCode == null) item.TariffCode  = "";
          if(item.TypeCode == null) item.TypeCode  = "";
          if(item.TypeName == null) item.TypeName  = "";
          if(item.UnitName == null) item.UnitName = "";

    });

  }  
  // --------------------------------------------
  public filter(field_name:string, criteria:string):Array<ProductGroup>{

    criteria = criteria.trim();

    if(criteria.length == 0){
      return this.Datasource;
    }
    // -------------------------------------
    field_name = field_name.trim();

    

    if(field_name.length==0){  // filter all string field

      // console.log("filter ", criteria, " at all field");

      return this.Datasource.filter((item:ProductGroup)=>{

          let result = (
            (item.Name.indexOf(criteria) > -1) ||
            (item.Code.indexOf(criteria) > -1) ||
            (item.CasNo.indexOf(criteria) > -1) ||
            (item.StatisticalCode.indexOf(criteria) > -1) ||
            (item.TariffCode.indexOf(criteria) > -1) ||
            (item.TypeCode.indexOf(criteria) > -1) ||
            (item.TypeName.indexOf(criteria) > -1)  //||            (item.UnitName.indexOf(criteria) > -1)
          );

          return result;
      });

    }else{

      // console.log("filter ", criteria, " at ", field_name);

      return this.Datasource.filter((item:ProductGroup)=>{
        return (item[field_name].indexOf(criteria) > -1);
      });

    }

    


  }
  // --------------------------------------------
}
