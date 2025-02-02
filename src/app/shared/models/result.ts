import { ServerResultCode } from '../enums/server_result_code.enum';

export class ServerResult {
  public message: Array<string>;
  public has_error: boolean;
  public result_code: number;
  public data: any;

  constructor(){
    this.init();
  }
  // ---------------------------------------------
  private init():void{
    this.data = null;
    this.has_error = true;
    this.result_code = ServerResultCode.NO_RESULT;
    this.message = new Array();
    // this.message = 'no pattern of server result '
  }
  // ---------------------------------------------
  public static setServerResult(source:any):ServerResult{

    let result:ServerResult = new ServerResult();

    if(source.message!==undefined && source.has_error!==undefined && source.result_code!==undefined && source.data!==undefined){
      result.data = source.data;
      result.message = source.message;
      result.result_code = source.result_code;
      result.has_error = source.has_error;
    }

    return result;
  }
  // ---------------------------------------------
  public get listAllMessage():string{
    return this.message.join('\n');
  }
}
// ---------------------------------------------
// ------------------------------------------------
export class EventResult {
  public sender: any;
  public data: any;

  public constructor(sender: any = null, data: any = null) {
    this.sender = sender;
    this.data = data;
  }
}

export class LookupData {
  public key: string;
  public title: string;

  //public constructor(init?: Partial<LookupData>) {
  //  Object.assign(this, init);
  //}
}


export class ServerConfig {

  public base_url: string;

  public did_url: string;
  public profile_url: string;
  public jumpto_url: string;
  public download_url: string;
  public allow_user_refresh_browser: boolean;

  public application_name: string;
  public application_version: string;

  public upload_file_size: number;
  public upload_file_type: string;

  public constructor() {
    this.base_url = "/trader";

    this.did_url = "/EInternet62/Home/Index";
    this.profile_url = "/EInternet62/Account/getEProfile";
    this.jumpto_url = "/EInternet62/Account/FromELicensing";
    this.download_url = "/api/download/";

    this.allow_user_refresh_browser = true;

    this.application_name = "E Licensing for Trader";
    this.application_version = "";

    this.upload_file_size = 2048000;
    this.upload_file_type = "pdf,jpg,jpeg,png,bmp,gif";

    //console.log(this);
  }
}
