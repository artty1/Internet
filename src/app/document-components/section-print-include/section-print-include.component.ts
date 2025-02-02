import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from 'src/app/application-context';
import { BaseSection } from 'src/app/shared/base/base-section';
import { RequestDocumentService } from 'src/app/shared/services/request-document.service';
import { PrintInclude, RequestDocument } from '../../shared/models/request-document';
import { RequestDocumentType } from 'src/app/shared/enums/request-type.enum';

@Component({
  selector: 'cdss-section-print-include',
  templateUrl: './section-print-include.component.html',
  styleUrls: ['./section-print-include.component.css']
})
export class SectionPrintInclude extends BaseSection implements OnInit {

  private SPLIT_SEPERATOR:string = "|*|";
  private default_other_10:string = "แบบชี้แจงประกอบแบบคำขอ ย.ภ.1 และแบบ ย.ภ.8";
  private default_other_20:string = "";

  private item_import_10: PrintInclude;
  private item_export_20: PrintInclude;
  private item_export_21: PrintInclude;

  // --------------------------------------------
  constructor(public app:ApplicationContext, public  repo: RequestDocumentService ) {
    super(app, repo);

    if(this.ForOwnerOrImportIntoBorder || this.ForOwnerOrImportIntoBorder_WithRenew){
      let item_10:PrintInclude = this.getItem(10);
      if(item_10==null){
        this.item_import_10 = new PrintInclude(10);
        this.repo.currentDocument.PrintIncludeList.push(this.item_import_10);

      }else{
        this.item_import_10 = item_10;
      }
    }
    else if(this.ForExportOutofBorder){

      let item_20:PrintInclude = this.getItem(20);
      let item_21:PrintInclude = this.getItem(21);

      if(item_20==null){
        this.item_export_20 = new PrintInclude(20);
        this.repo.currentDocument.PrintIncludeList.push(this.item_export_20);
        // console.log("add default export 20");
      }else{
        this.item_export_20 = item_20;
      }

      if(item_21==null){
        this.item_export_21 = new PrintInclude(21);
        this.repo.currentDocument.PrintIncludeList.push(this.item_export_21);
        // console.log("add default export 21");
      }else{
        this.item_export_21 = item_21;
      }
    }
    // else if(this.ForOwnerOrImportIntoBorder_WithRenew){

    // }

    this.repo.currentDocument.PrintIncludeList.forEach((item:PrintInclude)=>{
      if(item.Comment==null) item.Comment = "";
    });

    // console.log("PrintIncludeList : ", this.repo.currentDocument.PrintIncludeList);

  }
  // --------------------------------------------
  ngOnInit() {

  }
  // --------------------------------------------
  public get Import10Comment():string{
    return this.item_import_10.Comment;
  }
  public set Import10Comment(value:string){
    this.item_import_10.Comment = value;
  }
  public get isImport10Active():boolean{
    return this.item_import_10.IsCheck;
  }
  public swapImport10(){
    this.item_import_10.IsCheck = !this.item_import_10.IsCheck;

    if(this.item_import_10.IsCheck){
      this.item_import_10.Comment = this.default_other_10;
    }else{
      this.item_import_10.Comment = "";
    }

  }
  // --------------------------------------------
  public get Export20Comment():string{
    return this.item_export_20.Comment;
  }
  public set Export20Comment(value:string){
    this.item_export_20.Comment = value;
  }
  public get isExport20Active():boolean{

    return this.item_export_20.IsCheck;
  }
  public swapExport20(){
    this.item_export_20.IsCheck = !this.item_export_20.IsCheck;

    if(this.item_export_20.IsCheck){
      this.item_export_20.Comment = this.default_other_20;
    }else{
      this.item_export_20.Comment = "";
    }
    // console.log("this.item_export_20 :", this.item_export_20);
  }
  // --------------------------------------------
  public get Export21Comment():string{
    return this.getSplitCommentData(this.item_export_21.Comment, true, "");
  }
  public set Export21Comment(value:string){
    this.setSplitCommentData(this.item_export_21, value, true);
  }
  public get Export21Date():string{
    return this.getSplitCommentData(this.item_export_21.Comment, false, "");
  }
  public set Export21Date(value:string){
    this.setSplitCommentData(this.item_export_21, value, false);
  }
  public get isExport21Active():boolean{
    // console.log("this.item_export_21 :", this.item_export_21);
    return this.item_export_21.IsCheck;
  }
  // --------------------------------------------
  // public get ForOwnerOrImportIntoBorder():boolean{

  //   let reqType:RequestDocumentType = this.repo.currentRequestType;

  //   return (
  //     ( reqType == RequestDocumentType.EnterWithOwner || reqType == RequestDocumentType.Renewal_Enter ) ||
  //     ( reqType == RequestDocumentType.ImportWithOwner || reqType == RequestDocumentType.Renewal_Import ) ||
  //     ( reqType == RequestDocumentType.ProductionWithOwner || reqType == RequestDocumentType.Renewal_Production  ) ||
  //     ( reqType == RequestDocumentType.Owner || reqType == RequestDocumentType.Renewal_Owner || reqType == RequestDocumentType.Substitute_Owner )
  //   );
  // }
  // // --------------------------------------------
  public get ForOwnerOrImportIntoBorder():boolean{

    let reqType:RequestDocumentType = this.repo.currentRequestType;

    return (
      ( reqType == RequestDocumentType.EnterWithOwner ) || ( reqType == RequestDocumentType.ImportWithOwner ) ||
      ( reqType == RequestDocumentType.ProductionWithOwner ) || ( reqType == RequestDocumentType.Owner )
      // || reqType == RequestDocumentType.Substitute_Owner )
    );
  }
  // --------------------------------------------
  public get ForOwnerOrImportIntoBorder_WithRenew():boolean{

    let reqType:RequestDocumentType = this.repo.currentRequestType;

    return (
      ( reqType == RequestDocumentType.Renewal_Enter ) || ( reqType == RequestDocumentType.Renewal_Import ) ||
      ( reqType == RequestDocumentType.Renewal_Production  ) || ( reqType == RequestDocumentType.Renewal_Owner )
      || ( reqType == RequestDocumentType.Substitute_Owner )
    );
  }
  // --------------------------------------------
  public get ForExportOutofBorder():boolean{

    let reqType:RequestDocumentType = this.repo.currentRequestType;
    // console.log("ForExportOutofBorder : ", reqType);
    return (
      ( reqType == RequestDocumentType.SendSample || reqType == RequestDocumentType.Renewal_SendSample ) ||
      ( reqType == RequestDocumentType.Export || reqType == RequestDocumentType.Renewal_Export ) ||
      ( reqType == RequestDocumentType.ExportSpecial || reqType == RequestDocumentType.Renewal_ExportSpecial ) ||
      ( reqType == RequestDocumentType.CrossBorder || reqType == RequestDocumentType.Renewal_CrossBorder )
    );
  }
    // --------------------------------------------
  //   public getItemOfSequence(sequenceNo:number):boolean{
  //     let itemIndex:number = this.repo.currentDocument.PrintIncludeList.findIndex(item=>item.SequenceNo==sequenceNo);
  //     let result:boolean = false;

  //     if(itemIndex>-1) result = this.repo.currentDocument.PrintIncludeList[itemIndex].IsCheck;

  //     return result;
  //   }
  // // --------------------------------------------
  // public getItemContentOfSequence(sequenceNo:number):string{
  //   let itemIndex:number = this.repo.currentDocument.PrintIncludeList.findIndex(item=>item.SequenceNo==sequenceNo);
  //   let result:string = "";

  //   if(itemIndex>-1) result = this.repo.currentDocument.PrintIncludeList[itemIndex].Comment.toString();

  //   return result;
  // }
  // --------------------------------------------
  // public PrintItemList():Array<PrintInclude>{
  //   return this.repo.currentDocument.PrintIncludeList;
  // }
  // --------------------------------------------
  // public get PrintItem():Array<PrintInclude>{
  //   return this.repo.currentDocument.PrintIncludeList;
  // }
  // public set PrintItem(value:Array<PrintInclude>){
  //   this.repo.currentDocument.PrintIncludeList = value;
  // }
  // --------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    let result:boolean = true;

    // if(this.item_10){

    //   if(this.repo.currentDocument.PrintIncludeList.item_10.length == 0){
    //     result = false;
    //     this.app.setValidateControl("txtOtherDocument", false);
    //   }
    // }else{
    //   this.repo.currentDocument.PrintIncludeList.item_10 = "";
    // }

    return result;
  }
  // --------------------------------------------
  public clearValidate(eleID){
    this.app.setValidateControl(eleID, true);
  }
 // --------------------------------------------
  // public setItem10(){
  //   console.log('this.item_10 : ', this.item_10);

  //   if(this.item_10){
  //     this.item_10_detail = this.default_other;
  //   }else{
  //     this.item_10_detail = "";
  //   }

  // }
 // --------------------------------------------
  // public get item_10_detail():string{
  //   if(this.repo.currentDocument.PrintIncludeList.item_10 == null){
  //     return "";
  //   }else{
  //     return this.repo.currentDocument.PrintIncludeList.item_10;
  //   }
  // }
  // public set item_10_detail(value:string){
  //   this._item_10_detail = value;
  //   this.PrintItem.item_10 = value;
  // }
  // --------------------------------------------
  // public get has_item_10():boolean{
  //   return (this.PrintItem.item_10 != null) && (this.PrintItem.item_10.trim().length > 0);
  // }
  // public set has_item_10(value:boolean){

  //   if(value){
  //     this.PrintItem.item_10 = this.default_other;
  //   }else{
  //     this.PrintItem.item_10 = "";
  //   }
  // }
  // public get has_item_10():boolean{
  //   return this.item_10;
  // }
  // public set has_item_10(value:boolean){
  //   this.item_10 = value;
  //   if(this.item_10){
  //     if(this.repo.currentDocument.PrintIncludeList.item_10.length == 0){
  //       this.repo.currentDocument.PrintIncludeList.item_10 = this.default_other;
  //     }
  //   }else{
  //     this.repo.currentDocument.PrintIncludeList.item_10 = "";
  //   }

  // }
  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  // public get HideIfCrossBorder():boolean{
  //   return ( this.repo.currentRequestType == RequestDocumentType.CrossBorder ) ||
  //   ( this.repo.currentRequestType == RequestDocumentType.CrossBorderWithOwner ) ||
  //   ( this.repo.currentRequestType == RequestDocumentType.Renewal_CrossBorder ) ||
  //   ( this.repo.currentRequestType == RequestDocumentType.OwnerReferCrossBorder ) ||
  //   ( this.repo.currentRequestType == RequestDocumentType.Substitute_CrossBorder );
  // }
  // -------------------------------------
  // public get ImportItem_01():boolean{
  //   // return this.repo.currentDocument.PrintIncludeList
  //   return true;
  // }
  public changeCheckInclude(sequenceNo:number){
    let item = this.getItem(sequenceNo);

    if(item==null){
      item = new PrintInclude();
      item.IsCheck = true;
      item.SequenceNo = sequenceNo;
      this.repo.currentDocument.PrintIncludeList.push(item);
    }else{
      item.IsCheck = !item.IsCheck;
    }
  }

  // --------------------------------------------
  public getSequenceCheck(sequenceNo:number):boolean{
    let item:PrintInclude = this.getItem(sequenceNo);
    let result:boolean = false;

    if(item!=null) result = item.IsCheck;

    return result;
  }
  // --------------------------------------------
  private getItem(sequenceNo:number):PrintInclude{
    let itemIndex:number = this.repo.currentDocument.PrintIncludeList.findIndex(item=>item.SequenceNo==sequenceNo);
    let result: PrintInclude = null;

    if(itemIndex>-1){
      result = this.repo.currentDocument.PrintIncludeList[itemIndex];
    }

    return result;
  }
  // --------------------------------------------
  private getSplitCommentData(data:string, isFirst:boolean,defaultValue:string):string{
    let result:string = defaultValue;


    let sResult = data.split(this.SPLIT_SEPERATOR);

    if(sResult.length==2){
      result = sResult[isFirst?0:1];
    }else if(sResult.length==1){
      result = isFirst?sResult[0]:defaultValue;
    }

    return result;
  }
  // --------------------------------------------
  private setSplitCommentData(item:PrintInclude, newData:string, isFirst:boolean, ){
    let result:string = "";
    let anotherData:string = this.getSplitCommentData(item.Comment, !isFirst, "");

    if(isFirst){
      item.Comment = newData+this.SPLIT_SEPERATOR+anotherData;
    }else{
      item.Comment = anotherData+this.SPLIT_SEPERATOR+newData;
    }

  }
  // --------------------------------------------
  // --------------------------------------------

}
