export class RequestFileInclude{

  public fileItems: Array<RequestFileItem>;

  constructor(
    // public requestDocumentId:number = 0,

  ){
    this.fileItems = new Array();
  }

  public get hasDirtyItem():boolean{
    return (this.fileItems.findIndex((f: RequestFileItem)=>{
      return f.isDirty;
    }) > -1);
  }
  public get getDirtyItems(): Array<RequestFileItem>{
    return this.fileItems.filter((f: RequestFileItem)=>f.isDirty);
  }

}
//--------------------------------------------------------------
export class RequestFileItem {

  // private _temp_for_delete: boolean = false;
  private _isDirty:boolean = false;
  private _for_delete: boolean = false;

  constructor(
    public id:number = 0,
    public name: string = '',
    public token: string = '',
    for_delete: boolean = false,
    public file_extension: string = 'pdf'
  ){
    // this._temp_for_delete = for_delete;
    this._for_delete = for_delete;
  }

  public setItemFroServerResult(){
    this._isDirty = true;
  }

  public get for_delete():boolean{
    return this._for_delete;
  }
  public set for_delete(value: boolean){
    if(this._for_delete!=value){
      this._for_delete = value;
      this._isDirty = true;
    }
  }

  public get isDirty():boolean{
    return this._isDirty;
  }
}
//--------------------------------------------------------------
