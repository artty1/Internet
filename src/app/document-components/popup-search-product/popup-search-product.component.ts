import { Component, OnInit, ViewChild } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';
import { ProductService } from '../../shared/services/lookup/product.service';
import { Product } from '../../shared/models/lookup';
import { EventResult } from '../../shared/models/result';
import { DatagridPaginationComponent } from 'src/app/components/datagrid-pagination/datagrid-pagination.component';

@Component({
  selector: 'cdss-popup-search-product',
  templateUrl: './popup-search-product.component.html',
  styleUrls: ['./popup-search-product.component.css']
})
export class PopupSearchProduct extends baseModalDialog implements OnInit {

  @ViewChild("pg", { static: true }) private paging: DatagridPaginationComponent;

  public criteriaSearch: string = '';
  public minimumCharactor: number = 1;
  private lastTimeCriteriaSearchOnServer: string = '';

  private tempDataSource: Array<Product>;

  private is_searching: boolean = false;

  constructor(protected repo: ProductService) {
    super();
    this.allowEscape = true;
    this.tempDataSource = new Array();

  }
  // -----------------------------------------
  ngOnInit() {
  }
  // -----------------------------------------
  public get enableSearchButton(): boolean {

    return false;
    // if (this.repo.isLoading || (!this.HasFilter)) {
    //   return false;
    // }

    // if (this.lastTimeCriteriaSearchOnServer.length == 0) {
    //   return true;
    // }

    // if (this.criteriaSearch.indexOf(this.lastTimeCriteriaSearchOnServer) == 0) {
    //   return false;
    // }else {
    //   return true;
    // }
  }
  // -----------------------------------------
  public get isLoading(): boolean {
    return this.repo.isLoading;
  }
  // -----------------------------------------
  public get noData(): boolean {
    if (this.lastTimeCriteriaSearchOnServer.length == 0) {
      return false;
    }

    return (this.tempDataSource.length == 0 && !this.repo.isLoading);
  }
  // -----------------------------------------
  public get footer(): string {

    let result = "";

    if(this.HasFilter){
      result = "ข้อมูลชนิดของยุทธภัณฑ์ที่ค้นหาได้ " + this.paging.RecordCount.toString() + " ชนิด จากทั้งหมด "+this.repo.Datasource.length.toString() + " ชนิด";    
    }else{
      result = "ข้อมูลชนิดของยุทธภัณฑ์ " + this.paging.RecordCount.toString() + " ชนิด";    
    }

    
    return result;
  }
  // -----------------------------------------
  // public searchProduct() {
    
  //   this.repo.CurrentFilter = this.criteriaSearch;
  //   this.lastTimeCriteriaSearchOnServer = this.criteriaSearch;

  //   this.repo.refresh();
  // }
  // -----------------------------------------
  public get HasFilter():boolean{
    return (this.criteriaSearch.trim().length > this.minimumCharactor);
  }
  // -----------------------------------------
  public get ProductList(): Array<Product> {

    // if(!this.HasFilter){
    //   this.paging.Datasource = this.repo.Datasource;

    //   return this.paging.DataPage;
    // }else{

      this.paging.Datasource = this.repo.filter("", this.criteriaSearch);

      return this.paging.DataPage;

    // }

  }
  // -----------------------------------------
  public selectProduct(item: Product) {

    let result = this.buildResult(item);

    this.on_command.emit(result);

    this.closeDialog(item);
  }
  // -----------------------------------------
  public clearSearchData() {
    this.repo.clearData();
    this.clearCriteria();
  }
  // -----------------------------------------
  public clearCriteria() {
    this.criteriaSearch = "";
    document.getElementById("txtProductGroupCriteria").focus();
  }
  // -----------------------------------------
  // public get PagingCurrentPage(): number {
  //   return this.repo.CurrentPage;
  // }
  // // -----------------------------------------
  // public get PagingPageCount(): number {
  //   return this.repo.PageCount;
  // }
  // // -----------------------------------------
  // public movePage(arg:EventResult): void{
  //   this.repo.MovePageTo(arg.data);
  // }

}
