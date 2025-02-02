import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApplicationContext } from 'src/app/application-context';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {

  private config_url: string = '/api/Config/getConfig';
  private config_token_url: string = '/Config/getToken';
  // ----------------------------------------------------
  constructor(private http:HttpClient, protected app: ApplicationContext) {

    if (!isDevMode()) {
      this.config_url = '/trader' + this.config_url;
    }

  }
  // ----------------------------------------------------
  public loadToken(callback_success: Function, callback_error: Function) {

    const data = {
      trader_id: this.app.currentUser.trader_id,
      user_code: this.app.currentUser.user_code,
      flag_something: false,
      token: this.app.currentUser.token
    }

    const url = this.app.Configuration.api_url+this.config_token_url

    this.http
      .post(url, data)
      .subscribe((resp:any)=>{
        // console.log('load token : ', resp);
        callback_success(resp.data);
      })

  }
  // ----------------------------------------------------
  // public loadConfig(callback_success: Function, callback_error: Function) {

  //   this.http.get(this.config_url).toPromise<any>()
  //     .then(result => {
  //       if (result.has_error == false) {

  //         let config = new ServerConfig();

  //         console.log('server config : ',result);

  //         config.base_url = result.data.BaseModuleURL;
  //         config.did_url = result.data.MainURL;
  //         config.download_url = result.data.DownloadURL;
  //         config.jumpto_url = result.data.JumpBackURL;
  //         config.profile_url = result.data.ProfileURL;
  //         config.allow_user_refresh_browser = result.data.AllowUserRefreshBrowser;
  //         config.application_name = result.data.ApplicationName;
  //         config.application_version = result.data.ApplicationVersion;

  //         config.upload_file_size = result.data.Upload_MaxSize;
  //         //config.upload_file_type = result.data.upload_file_type
  //         config.upload_file_type = 'DOC,DOCX,PDF,JPG,JPEG,PNG,BMP,GIF';
  //         //config.base_url = result.data.base_url;
  //         //config.did_url = result.data.did_url;
  //         //config.download_url = result.data.download_url;
  //         //config.jumpto_url = result.data.jumpto_url;
  //         //config.profile_url = result.data.profile_url;
  //         //config.allow_user_refresh_browser = result.data.allow_user_refresh_browser;
  //         //config.application_name = result.data.application_name;
  //         //config.application_version = result.data.application_version;

  //         //config.upload_file_size = result.data.upload_file_size;
  //         //config.upload_file_type = result.data.upload_file_type

  //         callback_success(config);

  //       } else {
  //         console.log('result error : ', result);
  //         callback_error(result);
  //       }

  //     })
  //     .catch(err => {
  //       console.log('error : ', err);
  //       callback_error(err);
  //     }
  //   );

  // }
  // ----------------------------------------------------
}
