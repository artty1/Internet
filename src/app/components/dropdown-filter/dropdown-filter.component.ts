import { Component, OnInit, Input } from '@angular/core';
import { LookupData } from './../../shared/models/result';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent implements OnInit {

  private _datasource: Array<LookupData>;

  constructor() {
    this._datasource = new Array();
  }

  ngOnInit() {
  }

  @Input()
  public get datasource(): Array<LookupData> {
    return this._datasource;
  }
  public set datasource(value: Array<LookupData>) {
    this._datasource = value;
  }


}
