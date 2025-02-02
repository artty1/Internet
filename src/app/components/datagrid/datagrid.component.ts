import { Component, OnInit, AfterViewInit,Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { throwError } from 'rxjs';
import { ApplicationContext } from '../../application-context';
import { DGColumn, ActionCallback } from './models/dgconfig';

@Component({
  selector: 'cdss-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatagridComponent implements OnInit, AfterViewInit {

  private _pageSize: number = 10;
  private _currentPageNo: number = 1;
  private _datasourceURL: string = "";
  private _currentPageCount: number = 0;

  private _rowCallback: Function;

  private _columns: Array<DGColumn>;
  private _initDS: any;
  private _cache: boolean = false;

  private _clearCache: boolean = false;
  private _datasource: Array<any>;
  
  private _CSSHeader = "dgHeader";
  
  //-----------------------------------------------
  constructor(private app:ApplicationContext) {
    this._initDS = null;
    this._datasource = new Array();
    
    this._rowCallback = null;
    this._columns = new Array();

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
      this.onReady.emit(this);    
  }

  @Output() onReady: EventEmitter<DatagridComponent> = new EventEmitter();
  @Output() onAction: EventEmitter<ActionCallback> = new EventEmitter();

  //-----------------------------------------------------
  @Input() title: string;
  //-----------------------------------------------------
  @Input()
  public set cssHeader(value: string) {
    this._CSSHeader = value;
  }
  public get cssHeader(): string{
    return this._CSSHeader;
  }
  //-----------------------------------------------------
  @Input()
  public set cache(value: boolean) {
    this._cache = value;
  }
  public get cache(): boolean {
    return this._cache;
  }
  //-----------------------------------------------------
  @Input()
  public set pageSize(value: number) {
    if (value > 0) {

      this._clearCache = (this._pageSize != value);
      this._pageSize = value;

    } else {
      throw new Error("Page Size must more than 0");
    }
  }
  public get pageSize(): number {
    return this._pageSize;
  }
  //-----------------------------------------------------
  @Input()
  public set initDatasource(value: any) {
    this._initDS = value;
  }
  public get initDatasource(): any {
    return this._initDS;
  }
  //-----------------------------------------------------
  @Input()
  public set columns(value: Array<DGColumn>) {
    this._columns = value;
  }
  public get columns(): Array<DGColumn> {
    return this._columns;
  }
  //-----------------------------------------------------
  //-----------------------------------------------------
  public get getColumns(): Array<DGColumn> {

    let result = this._columns.filter(col => col.display);
    //console.log('getColumn() : ', result);

    return result;
  }

  //-----------------------------------------------------
  public clearColumn() {
    this._columns.length = 0;
  }
  //-----------------------------------------------------
  public autoGenerateColumn(initDatasource:any=null, isRemoveConfigColumn:boolean=true) {

    if (initDatasource != null) this._initDS = initDatasource;

    if (this._initDS == null) {
      throw new Error("Cannot generate column, Datasource is null");
    }

    if (isRemoveConfigColumn) {
      this._columns.length = 0;
    }
    //--------------------------------------
    console.log("autoGenerateColumn : ", typeof this._initDS );

    throw new Error("ยัง code ไม่เสร้จจ้าาาาาาาา, ไป config เอาเอง !!!!");

  }

  //-----------------------------------------------------
  public get currentDatasource() {
    //return this._datasource[this._currentPageNo - 1];
    console.log("init DS : ", this._initDS);
    return this._initDS;
  }
  //-----------------------------------------------------
  public AllDatasource(isPaging: boolean = false):any {

    //if (isPaging) {
      return this._datasource;
    //} else {
    //  return ... this._datasource;
    //}

  }
  //-----------------------------------------------------

  public movePageTo(pageNo:Number) {

    if (pageNo < 1) {
      pageNo = 1;
    } else if (pageNo> this._currentPageCount) {
      pageNo = this._currentPageCount;
    }
    //this._currentPageNo = pageNo;
    this.ajaxContent();
  }
  //-----------------------------------------------------
  public ajaxContent() {

  }
  public get isShowComponent(): boolean {
    
    let result = (this._datasource.length > 0) || (this._initDS != null);
    //console.log('isShowComponent: ', result);
    return result;
  }
  //-----------------------------------------------------
  public actionClick(index) {

  }
  //-----------------------------------------------------
}
