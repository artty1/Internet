import { Injectable } from '@angular/core';
import { DocumentStatus } from '../enums/document-status.enum';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }


  public getNameOfRequest(status: DocumentStatus): string {

    let result = "NONE";

    switch (status) {
      case DocumentStatus.Submited: result = "Submit"; break;
      case DocumentStatus.Accepted: result = "Accept"; break;
      case DocumentStatus.Inform: result = "Inform"; break;
      case DocumentStatus.Approved: result = "Approve"; break;      
      case DocumentStatus.RejectToTrader: result = "Reject"; break;

      case DocumentStatus.Draft: result = "Draft"; break;
      case DocumentStatus.Complete: result = "Complete"; break;
      case DocumentStatus.Cancel: result = "Cancel"; break;
    }


    return result;

  }

}
