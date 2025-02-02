import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, DoCheck, ViewEncapsulation } from '@angular/core';
import { EventResult } from '../../shared/models/result';
import { ApplicationContext } from 'src/app/application-context';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'cdss-datagrid-pagination',
  templateUrl: './datagrid-pagination.component.html',
  styleUrls: ['./datagrid-pagination.component.css']
})

//-------------------------------------------------
export class DatagridPaginationComponent implements OnInit, AfterViewInit, DoCheck {

  private static DEFAULT_PAGE_BUTTON_COUNT = 9;
  private static MINIMUN_PAGE_BUTTON_COUNT = 5;

  private static DEFAULT_PAGE_SIZE = 8;
  private static MINIMUN_PAGE_SIZE = 5;

  private datasource:Array<any>;
  private _check_datasource_count:number = 0;

  private current_page:number = 0;
  private page_count:number = 0;
  private page_size:number = 20;
  private record_count:number = 0;
  private page_button_count = 0;
  private row_no_start:number = 0;

  private _gap_button_left:number = 0;
  private _gap_button_right:number = 0;

  //-------------------------------------------------
  constructor(private app:ApplicationContext){

    this.PageSize = DatagridPaginationComponent.DEFAULT_PAGE_SIZE;
    this.PageButtonCount = DatagridPaginationComponent.DEFAULT_PAGE_BUTTON_COUNT;

    this.datasource = new Array();
    this.calculatePage();
  }
  //-------------------------------------------------
  ngDoCheck() {

    if(this.datasource.length != this._check_datasource_count){
      this._check_datasource_count = this.datasource.length;
      this.calculatePage();
    }

  }
  //-------------------------------------------------
  ngOnInit():void {

  }
  //-------------------------------------------------
  ngAfterViewInit():void {
    // let result = new EventResult();

    // result.sender = this;
    // result.data = null;
  }
  //-------------------------------------------------
  @Input("page-size")
  public get PageSize():number{
    return this.page_size;
  }
  // ----------------------------------
  public set PageSize(value:number){
    let data = this.SetInputToNumber(value, this.page_size);

    this.page_size = data;

  }
  //-------------------------------------------------
  // ------------------------------------------------
  @Input("current-page")
  public get CurrentPage():number{
    return this.current_page;
  }
  public set CurrentPage(value:number){
    // console.log("CurrentPage : ", value);
    this.current_page = value;
  }
  // ----------------------------------
  @Input("page-button-count")
  public get PageButtonCount():number{
    return this.page_button_count;
  }
  public set PageButtonCount(value:number){
    let data:number = this.SetInputToNumber(value, this.page_button_count);

    // console.log(data);
    if(data < DatagridPaginationComponent.MINIMUN_PAGE_BUTTON_COUNT){
      // console.log('loss then minimum : ', data);
      data = DatagridPaginationComponent.MINIMUN_PAGE_BUTTON_COUNT;
    }

    let pbz:number = data;
    this.page_button_count = data;


    this._gap_button_left = Math.ceil(pbz/2);
    this._gap_button_right = Math.floor(pbz/2);

    // console.log("set page button count : ", this.page_button_count, this._gap_button_left, this._gap_button_right, data, pbz);


  }
  // ----------------------------------
  public get Datasource():Array<any>{
    return this.datasource;
  }
  public set Datasource(value:Array<any>){
    // console.log("pageing Datasource : ", value)
    this.datasource = value;
  }
  // ----------------------------------
  public get RowNo():number{
    return this.row_no_start;
  }
  // ----------------------------------
  public get DataPage():Array<any>{

    let idx_start:number = ((this.current_page-1) * this.page_size);
    let idx_stop:number = (idx_start + this.page_size);

    this.row_no_start = idx_start+1;

    const result = this.datasource.slice(idx_start, idx_stop);

    // console.log('page_size : ', this.page_size, idx_start, idx_stop);
    // console.log("typeof idx_stop : ", typeof idx_stop);
    // console.log(result);

    return result;
    // return this.datasource.slice(idx_start, idx_stop);
  }
// ----------------------------------
  private calculatePage(){
    this.current_page = 1;
    this.record_count = this.datasource.length;

    this.page_count = Math.ceil(this.record_count / this.page_size)
  }
// ----------------------------------
  public gotoPage(value:number){
    this.current_page = value;
  }
// ----------------------------------
  public get IsShowPaging():boolean{
    return (this.page_count > 1);
  }
// ----------------------------------
  public get RecordCount():number{
    return this.record_count;
  }
// ----------------------------------
  public get PageCount():number{
    return this.page_count;
  }
  // -------------------------------------------
  public get IsFirstPage():boolean{
    return this.current_page == 1;
  }
  // ----------------------------------
  public get IsLastPage():boolean{
    return this.current_page == this.page_count;
  }
  // ----------------------------------
  public IsButtonCurrentPage(forPageNo:number){
    return forPageNo == this.current_page;
  }
// -------------------------------------------
  public get PageCountLoop():Array<number>{
    let result:Array<number>;
    let page_start:number;
    let page_stop:number;
    // -----------------------------------------
    if(this.page_count<this.page_button_count){
      result = new Array(this.page_count);
      page_start = 1;
      page_stop = this.page_count;
    }else{
      result = new Array(this.page_button_count);

      if((this.current_page-this._gap_button_left) < 1){
        page_start = 0;
        page_stop = this.page_button_count;
      }else if((this.current_page+this._gap_button_right)> this.page_count){
        page_start = (this.page_count - this.page_button_count);
        page_stop = this.page_count;
      }else{
        page_start = this.current_page - this._gap_button_left;
        page_stop = this.current_page + this._gap_button_right;
      }

      page_start++;

      // console.log(page_start, page_stop, this._gap_button_left, this._gap_button_right);
    }
    // -----------------------------------------
    for(let i=0; i<result.length; i++){
      result[i] = page_start+i;
    }
    // -----------------------------------------
    return result;
  }
  // -------------------------------------------
  public GetButtonClass(pageNo){
    let result = "btn btn-light btn-sm";

    if(pageNo == this.current_page){
      result = "btn btn-primary btn-sm";
    }

    return result;
  }
  // -------------------------------------------
  private SetInputToNumber(input_data:any, default_value:number = 0):number{

    if(!isNaN(input_data)){
      return parseInt(input_data);
    }else{
      return default_value;
    }

  }
  // ----------------------------------

  // -------------------------------------
  public MovePrevious(){
    this.current_page--;
  }
  // ----------------------------------
  public MoveNext(){
    this.current_page++;
  }
  // ----------------------------------
  public MoveFirst(){
    this.current_page=1;
  }
  // ----------------------------------
  public MoveLast(){
    this.current_page = this.page_count;
    // console.log(this.page_count);
  }
  // ----------------------------------
  public MoveTo(pageNo:number){
    this.current_page = pageNo;

  }
  // -------------------------------------
  public get selectPageSize():number{
    // return DatagridPaginationComponent.DEFAULT_PAGE_SIZE;
    return this.page_size;
  }
  public set selectPageSize(value:number){
    // DatagridPaginationComponent.DEFAULT_PAGE_SIZE = value;
    this.page_size = parseInt(value.toString());
    // console.log('this.page_size : ', this.page_size);
    this.calculatePage();
  }
  // -------------------------------------
  // public setPageSize(){
  //   console.log('this.page_size : ', this.page_size);
  //   this.calculatePage();
  // }
  // -------------------------------------
}
