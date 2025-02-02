import { isGeneratedFile } from '@angular/compiler/src/aot/util';

// ---------------------------------------------------
// ---------------------------------------------------
// ---------------------------------------------------
let mockup_key = '~'; // for checking with is_mockup = true
// ---------------------------------------------------
let config = {
  application_name: 'E Licensing for Trader',
  version: '0.0.0.0',
  lang: 'th' ,
  profile_url: '/EInternet/Account/getEProfile',
  api_url: '/trader/api/',
  did_url: '/EInternet/',
  elicensing_api_url: '/ELicensing/api/',
  // elicensing_print: 'http://192.168.130.30/ElicensingPrint/api/report/license/',
  cookie_token_name: 'token',
  is_mockup: '',  // if default is_mockup = true, set is_mockup = mockup_key
  allow_user_refresh_browser: false,
  mockup_user: {
    user_id: 0,
    user_code: '',
    user_name: '',
    trader_id: 0,
    trader_name: ''
  }
}
// ---------------------------------------------------
// ---------------------------------------------------
export class Configuration {

  public application_name: string = 'Trader App';
  public contact: string = '';
  public version:string = 'version not set';
  public lang:string = 'th';
  public profile_url: '';
  public api_url: '';
  public did_url: '';
  public elicensing_api_url: '';
  public elicensing_print_url: '';
  public cookie_token_name:string = '';
  public is_mockup:boolean = false;
  public allow_user_refresh_browser:boolean = false;
  public mockup_user:any = null;
  // ----------------------------------------------------------
  constructor() {
    this.SetConfig(config);
  }
  // ----------------------------------------------------------
  public SetConfig(config:any):void{    

    this.application_name = (config.application_name!=undefined) ? config.application_name : this.application_name;
    this.contact = (config.contact!=undefined) ? config.contact: this.contact;
    this.version = (config.version!=undefined) ? config.version : this.version;
    this.lang = (config.lang!=undefined) ? config.lang : this.lang;
    this.profile_url = (config.profile_url!=undefined) ? config.profile_url : this.profile_url;
    this.api_url = (config.api_url!=undefined) ? config.api_url : this.api_url;
    this.did_url = (config.did_url!=undefined) ? config.did_url : this.did_url;
    this.elicensing_api_url = (config.elicensing_api_url!=undefined) ? config.elicensing_api_url : this.elicensing_api_url;

    // this.elicensing_print_url = (config.elicensing_print_url!=undefined) ? config.elicensing_print_url : this.elicensing_print_url;
    // this.download_url = (config.download_url!=undefined) ? config.download_url : this.download_url;
    // this.excel_template_for_appendix = (config.excel_template_for_appendix!=undefined) ? config.excel_template_for_appendix : this.excel_template_for_appendix;
    // this.excel_template_for_consession = (config.excel_template_for_consession!=undefined) ? config.excel_template_for_consession : this.excel_template_for_consession;
    this.cookie_token_name = (config.cookie_token_name!=undefined) ? config.cookie_token_name : this.cookie_token_name;

    if(config.is_mockup){
      this.is_mockup = (config.is_mockup == mockup_key);
    }

    if(this.is_mockup){
      this.mockup_user = (config.mockup_user!=undefined) ? config.mockup_user : this.mockup_user;
    }

    this.allow_user_refresh_browser = (config.allow_user_refresh_browser!=undefined) ? config.allow_user_refresh_browser : this.allow_user_refresh_browser;


    // console.log("this.api_url :", this.api_url, this.profile_url, this.did_url);
    
  }
  // ----------------------------------------------------------
}

// config in HTML

// var app_config = {
  //   application_name: 'E-Licensing for Trader',
  //   contact: 'หมายเลขติดต่อ 099-999-9999',
  //   version: '-------',
  //   profile_url: 'http://192.168.130.30/EInternet/Account/getEProfile',
  //   // api_url: 'http://localhost:56249/api/',
  //   api_url: 'http://192.168.130.30/trader/api/',
  //   did_url: 'http://192.168.130.30/EInternet/',
  //   elicensing_api_url: 'http://192.168.130.30/ELicensing/api/',
  //   cookie_token_name: 'token',
  //   is_mockup: '~',  // if default is_mockup = true, set is_mockup = mockup_key
  //   allow_user_refresh_browser: false,
  //   mockup_user: {
  //     user_id: 104881,
  //     user_code: 'go012701',
  //     user_name: 'go012701',
  //     trader_id: 104881,
  //     trader_name: 'เทศบาลตำบลพลายชุมพล 23'
  //   }
  // }


  // ELicensing
  // https://officer.e-licensing-did-mod.in.th/

  // EInternet
  // https://e-licensing-did-mod.in.th/