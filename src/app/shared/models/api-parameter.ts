import { RequestDocument } from "./request-document";

//export class ApiParameter {
//  public trader_id: number=0;
//  public user_code: string='';
//  public doc_id: number=0;
//  public flag_something: boolean = false;

//  //public data: any;
//}
//-------------------------------------

export class API_UserReference {
  public trader_id: number
  public user_code: string;
  public flag_something: boolean;
  public token: string;
}
//-------------------------------------
export class API_Document extends API_UserReference
{
  public doc_id: number;
}

export class API_RequestDocumentDetail extends API_UserReference
{
  public doc_id: number;
  public data: RequestDocument;
}

export class API_DocumentRequestReference extends API_UserReference {
  public request_doc_id: number;
  public license_id: number;
  //public owner_licenser_id: number;
}

export class API_LookupFilter extends API_UserReference {
  public criteria: string;
}

export class API_LookupFilterSet extends API_UserReference {
  public criteria: Array<string>;
}

