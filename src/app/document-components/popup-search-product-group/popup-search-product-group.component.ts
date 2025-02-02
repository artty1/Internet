import { Component, OnInit, ViewChild } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';
import { ProductGroupService } from '../../shared/services/lookup/product-group.service';
import { ProductGroup } from '../../shared/models/lookup';
import { EventResult } from '../../shared/models/result';
import { DatagridPaginationComponent } from 'src/app/components/datagrid-pagination/datagrid-pagination.component';

@Component({
  selector: 'cdss-popup-search-product-group',
  templateUrl: './popup-search-product-group.component.html',
  styleUrls: ['./popup-search-product-group.component.css']
})
export class PopupSearchProductGroup extends baseModalDialog implements OnInit {

  @ViewChild("pg", { static: true }) private paging:DatagridPaginationComponent;

  public criteria_search: string = "";
  private criteria_change:boolean = true;

  constructor(protected repo: ProductGroupService) {
    super();
    this.allowEscape = true;
    // this.repo.criteria = "";
    this.CriteriaSearch = "";
  }

  ngOnInit() {
  }
  // -----------------------------------------
  public get CriteriaSearch(): string {
    return this.criteria_search;
  }
  public set CriteriaSearch(value: string) {
    if(this.paging!=null) this.paging.MoveFirst();

    this.criteria_change = true;
    this.criteria_search = value;
  }
  // -----------------------------------------
  public get isLoading(): boolean {
    return this.repo.isLoading;
  }
  // -----------------------------------------
  public get noData(): boolean {
    return !this.repo.isLoading && !this.repo.hasData;
  }
  // -----------------------------------------
  public get footer(): string {

    let result = "ข้อมูลชนิดของยุทธภัณฑ์ " + this.repo.Datasource.length + " ชนิด";

    if (this.HasFilter) {
      result = "ค้นพบ " + this.paging.RecordCount.toString() + " ข้อมูล จากทั้งหมด "+ this.repo.Datasource.length.toString() +" ชนิด";
    }

    return result;
  }
  // -----------------------------------------
  public get HasFilter():boolean{
    return (this.CriteriaSearch.trim().length > 0);
  }
  // -----------------------------------------
  public get Datasource(): Array<ProductGroup> {

    // if(this.criteria_change){
    //   this.criteria_change = false;
      this.paging.Datasource = this.repo.filter("", this.criteria_search);
    // }

    return this.paging.DataPage;
  }
  // -----------------------------------------
  public selectProductGroup(item:ProductGroup) {

    let result = this.buildResult(item.ID);

    this.on_command.emit(result);

    this.closeDialog(item);
  }
  // -----------------------------------------
  public clearCriteria() {
    this.CriteriaSearch = "";
    // this.repo.criteria = "";
    document.getElementById("txtProductGroupCriteria").focus();
  }
  // -----------------------------------------
  public get RowNo():number{
    return this.paging.RowNo;
  }
  // -----------------------------------------
}
