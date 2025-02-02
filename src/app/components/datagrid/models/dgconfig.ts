import { DatagridComponent } from "../datagrid.component";

export class DGColumn {
  public title: string;
  public fieldName: string;
  public align: string;
  public display: boolean = true;

  constructor(title: string = '', fieldname: string = '', columnCSS:string = "data-left", display: boolean = true) {
    this.title = title;
    this.fieldName = fieldname;
    this.align = columnCSS;
    this.display = display;
  }
}


export class ActionCallback {
  public action: DatagridAction;
  public source: DatagridComponent;
  public data: any;
}


export enum DatagridAction {
  Select, View, Edit, Delete, Check, Uncheck
}
