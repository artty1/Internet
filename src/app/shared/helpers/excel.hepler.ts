import { Injectable } from '@angular/core';


declare var XLSX;

// @Injectable({
//   providedIn: 'root'
// })

export class ExcelHelper {

  //public toFile(data:Array<any>, firstlineCaption: Array<any> = null, fileName:string = "export", workSheetName: string = "Sheet1"){
  public toFile(data:Array<any>, lineHeadersCaption: Array<any> = null, fileName:string = "export", workSheetName: string = "Sheet1"){

    fileName = fileName.trim();
    if(fileName.length==0){
      fileName = "export.xlsx";
    }else{
      fileName = fileName+".xlsx";
    }
    //-----------------------------------------------------
    workSheetName = workSheetName.trim();
    if(workSheetName.trim().length == 0){
      workSheetName = "Sheet1";
    }
    //-----------------------------------------------------
    const expData = [];
    // if(firstlineCaption){
    //   // data.unshift(firstlineCaption);
    //   expData.push(Object.values(firstlineCaption));
    // }
    if(lineHeadersCaption){
      
      lineHeadersCaption.forEach((lineItem: any)=>{

        if(Array.isArray(lineItem)){
          expData.push(Object.values(lineItem));
        }else{
          expData.push(lineItem);
        }
        
      });
      
    }
    //-----------------------------------------------------
    if(data.length>0){
      data.forEach((row:any)=>{

        if(Array.isArray(row)){
          expData.push(Object.values(row));
        }else{
          expData.push(row);
        }
        
      });
    }
    //-----------------------------------------------------
    console.log('expData : ', expData);
    //-----------------------------------------------------
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(expData);

    XLSX.utils.book_append_sheet(wb, ws, workSheetName);
    XLSX.writeFile(wb, fileName);

  }
//-----------------------------------------------------
}
