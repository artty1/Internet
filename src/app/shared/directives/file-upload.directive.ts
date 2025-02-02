import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ApplicationContext } from 'src/app/application-context';
import { ServerResult } from '../models/result';
// import { BaseApplication } from '../bases/base-application';
// import { ServiceResult } from '../models/serviceResult';

@Directive({
  selector: 'button[cdssFileUpload]'
})
export class FileUploadDirective {

  // public static URL_UPLOAD: string = 'upload';
  // public static FIELD_FILE_UPLOAD: string = 'fileName';

  public static ERROR_ELEMENT_NOTSUPPORT: string = "element must button tag !!!";
  public static ERROR_VALIDATE_FILE_NOTSUPPORT: string = "file type not support !!!";
  public static ERROR_VALIDATE_FILE_SIZE: string = "file size over limit !!!";
  
  @Input("message-error-file-size") public messageError_FileSize: string = '';

  @Output("on-upload-begin") private onUploadBegin: EventEmitter<ServerResult> = new EventEmitter();
  @Output("on-upload-error") private onUploadError: EventEmitter<ServerResult> = new EventEmitter();
  @Output("on-upload-success") private onUploadSuccess: EventEmitter<ServerResult> = new EventEmitter();

  @Output("on-validate-error") private onValidateError: EventEmitter<ServerResult> = new EventEmitter();

  @Output("on-done") private onAllDone: EventEmitter<any> = new EventEmitter();

  // @Input("file-extension") private fileExtensions: string = '';

  // private app: BaseApplication;

  private isReady:boolean = false;

  private uploadElem: HTMLInputElement = null;
  private parentElem: HTMLButtonElement;

  private _allowMultiple:boolean = false;
  private _fileExtensions:string = '';
  // private _upload_url: string = '';
  // private _upload_file_name:string = '';
  // private _upload_file_size:number = 0;


  constructor(private app: ApplicationContext, eleRef: ElementRef) {
    
    this.messageError_FileSize = FileUploadDirective.ERROR_VALIDATE_FILE_SIZE;


    this.isReady = this.checkElement(eleRef.nativeElement);

    if(this.isReady){
      this.parentElem = <HTMLButtonElement>eleRef.nativeElement;
      this.init();
    }else{
      console.error(FileUploadDirective.ERROR_ELEMENT_NOTSUPPORT);
    }



  }
  //--------------------------------------------------------
  private checkElement(elm: HTMLElement):boolean{
    const tagName = elm.tagName.toLowerCase();
    return (tagName=="button");
  }
  //--------------------------------------------------------
  private init(){

    // this.app = new BaseApplication();

    const elem = document.createElement("input");
    const id = "file-upload-"+Math.floor(Math.random()*999999);

    elem.id = id;
    elem.type = "file";
    elem.className = "";
    elem.hidden = true;
    elem.onchange = ($event)=>{
      this.uploadFile(this.uploadElem.files);
    }

    document.body.appendChild(elem);

    this.uploadElem = <HTMLInputElement> document.getElementById(id);

    this.parentElem.classList.add("cdss-upload");
  }
  //--------------------------------------------------------
  @HostListener("click")
  public showSelectFile(){
    this.uploadElem.value = '';
    this.uploadElem.click();
  }
  //--------------------------------------------------------
  @Input("multiple")
  public get allowMultipleFile():boolean{
    return this._allowMultiple;
  }
  public set allowMultipleFile(value:boolean){
    this._allowMultiple = value;
    this.uploadElem.multiple = value;
  }
  //--------------------------------------------------------
  @Input("file-extension")
  public get fileExtensions(): string{
    return this._fileExtensions;
  }
  public set fileExtensions(value: string){

    value = value.trim();
    let extList = value.split(",");

    extList = extList.map(item=>{
      return item.trim().toLowerCase();
    });

    this._fileExtensions = extList.join(",");

    const fs = extList.map((item:string)=>{
      return "."+item;
    }).join(",");

    this.uploadElem.accept = fs;
  }
  //--------------------------------------------------------
  private get fileExtenstionList():Array<string>{
    return this._fileExtensions.split(",");
  }
  //--------------------------------------------------------
  private uploadFile(fs:FileList){

    this._fileUploadStatusCount = 0;
    this._fileUploadAllResult.length = 0;

    // console.log('uploadFile: ', fs);
    if(!this.isReady){
      console.error(FileUploadDirective.ERROR_ELEMENT_NOTSUPPORT);
      return false;
    }

    if(fs.length==0){
      console.log('no select some file.');
      return false;
    }

    if(!this.validateFileType(fs)){
      // console.log();
      this.onValidateError.emit(this.buildResultFileNotSupport(fs));
      this.onUploadError.emit(this.buildResultFileNotSupport(fs));
      return false;
    }

    if(!this.validateFileSize(fs)){
      this.onValidateError.emit(this.buildResultFileSizeNotSupport());
      this.onUploadError.emit(this.buildResultFileSizeNotSupport());
      return false;
    }

    const iFile = fs.length;
    for(let i=0; i<iFile; i++){
      this.beginUpload(fs[i], (isSuccess:boolean, sResultType:string, result:any)=>{
        const is_success = result.is_success;
        // console.log('manageMessage : ', is_success, result);
        // this.manageMessage(iFile, fs[i].name, isSuccess, result);
        this.manageMessage(iFile, fs[i].name, is_success, result);
      });
    }

  }
  //---------------------------------------------------------
  public get isWhileUpload(){
    return (this._fileUploadStatusCount > 0);
  }
  //---------------------------------------------------------
  private _fileUploadStatusCount: number = 0;
  private _fileUploadAllResult: Array<any> = new Array();
  //---------------------------------------------------------
  private manageMessage(fileUploadCount, fileName, isSuccess:boolean, result:any){

    this._fileUploadStatusCount++;

    const isUploadAllDone: boolean =  (this._fileUploadStatusCount==fileUploadCount);

    if(isSuccess){
      this.onUploadSuccess.emit(this.buildResultFileSuccess(fileName,result));
    }else{
      console.log('update error');
      this.onUploadError.emit(this.buildResultUploadError(fileName, result));
    }

    this._fileUploadAllResult.push({
      fileName: fileName,
      is_success: isSuccess,
      result: result
    });

    if(isUploadAllDone){
      this._fileUploadStatusCount = 0;
      let resultAllDone = new ServerResult();
      resultAllDone.data = this._fileUploadAllResult;

      this.onAllDone.emit(resultAllDone);

    }

  }
  //-----------------------------------------------------------
  private validateFileType(fs:FileList):boolean{

    if(this.fileExtensions.trim().length==0){
      return true;
    }

    let result:boolean = false;

    const extSupportList = this.fileExtenstionList;
    const extFileList:Array<string> = new Array();;

    for(let i=0; i<fs.length; i++){
      const fName = fs[i].name;
      const fileExts = fName.split(".");

      // console.log('fileExts : ', fileExts);

      if(fileExts.length>1){
        extFileList.push(fileExts[fileExts.length-1]);
      }else{
        console.log('file : '+ fName+' not extension');
        extFileList.push("");
      }
    }

    const idxOfExtNotInSupportList =  extFileList.findIndex(item=>{
      return (extSupportList.indexOf(item)==-1);
    });

    // console.log('extFileList : ', extFileList, 'extSupportList: ', extSupportList, 'idxOfExtNotInSupportList : ', idxOfExtNotInSupportList);

    return (idxOfExtNotInSupportList==-1);
  }
  //-----------------------------------------------------------
  private validateFileSize(fs:FileList):boolean{

    let result:boolean = true;
    const maximumFileSize = this.app.upload_file_size;

    
    for(let i=0; i<fs.length; i++){
      const f = fs[i];

      if(f.size > maximumFileSize){
        result = false;
        console.log('file : ', f.name+' is over size from '+maximumFileSize);
        this.uploadElem.value = '';
      }

    }

    // console.log("validateFileSize: , ", maximumFileSize, fs, result); 

    return result;
  }
  //--------------------------------------------------------
  //private beginUpload(f: File, tag: string = "") {
  private beginUpload(f: File, callbackDone:Function) {

    let ajax = new XMLHttpRequest();
    let formData = new FormData();

    formData.append(this.app.upload_field_name, f);

    ajax.upload.addEventListener("progress", (event) => {
      let percent = ((event.loaded / event.total) * 100);
    }, false);

    ajax.addEventListener("load", (event: any) => {
      let status = event.srcElement.status;
      if (status == 200) {
        callbackDone(true, 'success', JSON.parse(event.srcElement.response));
      } else {
        callbackDone(false, 'error', event);
      }
    }, false);

    ajax.addEventListener("error", (event) => {
      console.error('error upload image');
      console.log('error :', event);
      callbackDone(false, 'error', event);
    });

    ajax.addEventListener("abort", (event) => {
      console.log('abort :', event);
      callbackDone(false, 'abort', event);
    }, false);

    ajax.open("POST", this.app.upload_url);
    ajax.send(formData);

    const resultBegin = new ServerResult();

    resultBegin.data = f.name;

    this.onUploadBegin.emit(resultBegin);
    // this.onUploadBegin.emit(this.buildResultFileSuccess(f., result));
  }
  //---------------------------------------------------------
  private buildResultFileNotSupport(fs:FileList):ServerResult{
    const result = new ServerResult();
    const fileNameList: Array<string> = new Array();

    for(let i=0; i<fs.length; i++){
      const f = fs[i];
      fileNameList.push(f.name);
    }

    result.message.push(FileUploadDirective.ERROR_VALIDATE_FILE_NOTSUPPORT);
    result.message.push("-----------------")
    result.message.push("support file : ", this.fileExtenstionList.join(", "));
    result.message.push("-----------------")
    result.message.push(...fileNameList);

    return result;
  }
  //--------------------------------------------------------
  //private buildResultFileSizeNotSupport(fileName:string):ServiceResult{
  private buildResultFileSizeNotSupport():ServerResult{
    const result = new ServerResult();

    // result.message.push(fileName);
    // result.message.push(FileUploadDirective.ERROR_VALIDATE_FILE_SIZE);
    result.message.push(this.messageError_FileSize);

    return result;
  }
  //--------------------------------------------------------
  private buildResultUploadError(fileName:string, error:ProgressEvent):ServerResult{
    const result = new ServerResult();
    result.data = error;

    if(result.message==null) result.message = new Array();
    result.message.push(fileName);

    return result;
  }
  //--------------------------------------------------------
  private buildResultFileSuccess(fileName:string, resp:any):ServerResult{
    const result = new ServerResult();

    result.result_code = resp.code ? resp.code : '';
    result.data = resp.data ? resp.data : '';
    result.message = resp.message ? resp.message : [];

    // console.log('result.message: ', result.message);

    if(result.message==null) result.message = new Array();
    if(!Array.isArray(result.message)){
      const m = result.message;
      result.message = new Array();
      result.message.push(m);
    }
    result.message.push(fileName);

    return result;
  }
  //--------------------------------------------------------
}

