import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ApplicationContext } from '../../application-context';

import { baseModalDialog, DialogResult } from '../../shared/base/base-modal-dialog';
import { LocationService } from '../../shared/services/lookup/location.service';
import { Location } from '../../shared/models/request-document';
import { TransformCommonData } from '../../shared/helpers/transform-common-data';
import { DatagridPaginationComponent } from 'src/app/components/datagrid-pagination/datagrid-pagination.component';

@Component({
  selector: 'cdss-popup-list-location',
  templateUrl: './popup-list-location.component.html',
  styleUrls: ['./popup-list-location.component.css']
})
//export class PopupListLocationComponent extends BaseDialog implements OnInit, AfterViewInit {
export class PopupListLocation extends baseModalDialog implements OnInit {

  @ViewChild("pg", { static: true }) private paging: DatagridPaginationComponent;

  //private popup: ModalDialogComponent;
  //private popup: DialogComponent;
  private for_production:boolean = true;
  
  public transform = new TransformCommonData();

  //----------------------------------------------------
  constructor(private app: ApplicationContext, private repo:LocationService) {
    super();
    this.allowEscape = true;
  }
  //----------------------------------------------------
  ngOnInit() {

  }

  //--------------------------------------------------
  @Input("ForProduction")
  public get ForProduction(): boolean {
    return this.for_production;
  }
  public set ForProduction(value: boolean) {
    this.for_production = value;
  }
   //-----------------------------------------------
  //public initlocationList(args: DialogResult) {
  //  this.popup = args.sender;
  //}
  //----------------------------------------------------
  public get Datasource(): Array<Location> {

    let iForProduction:number = this.for_production ? 1:0;

    // let result = this.repo.Datasource.filter(loc => loc.FOR_PRODUCTION == iForProduction);

    this.paging.Datasource = this.repo.Datasource.filter(loc => loc.FOR_PRODUCTION == iForProduction);

    let result = this.paging.DataPage;

    return result;
  }
  //----------------------------------------------------
  public get getFooter(): string {
    return "จำนวน "+ this.paging.RecordCount.toString() +" ข้อมูล";
  }
  //----------------------------------------------------
  public get isLoading():boolean{
    return this.repo.isLoading;
  }
  //----------------------------------------------------
  public selectLocation(item){
    this.on_command.emit(this.buildResult(item));
  }
  //----------------------------------------------------
  public get showData(): boolean {
    return this.repo.hasData;
  }
  //----------------------------------------------------
  public refreshData() {
    this.repo.refresh();
  }
  //----------------------------------------------------
  public showPopup(forProduction:boolean){
    this.for_production = forProduction;

    //this.popup.showDialog();
    this.openDialog();
  }
  ////----------------------------------------------------
  //public hidePopup(){
  //  this.popup.closeDialog();
  //}
  //----------------------------------------------------
}
