import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';


@Component({
  selector: 'cdss-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModuleHeaderComponent {

  @Input('title') public title: string = '';
  @Input('show-refresh-button') public showRefreshButton:boolean = true;

  @Output('on-refresh') public onRefresh: EventEmitter<any> = new EventEmitter();

  private _isLoading:boolean = false;

  constructor() {

  }

  @Input('is-loading')
  public get isLoading():boolean{
    return this._isLoading;
  }
  public set isLoading(value:boolean){
    this._isLoading = value;
  }

  public refreshClick(){
    if(this.onRefresh != null) this.onRefresh.emit();
    this._isLoading = true;
  }

  // public setLoadingDone(){
  //   this._isLoading = false;
  // }

  // public get showRefreshButton():boolean{
    // console.log('showRefreshButton : ', this.onRefresh.subscribe);
    // return (this.onRefresh.subscribe.length>0);
  // }
}
