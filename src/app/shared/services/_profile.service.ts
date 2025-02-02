import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Profile } from '../models/profile';
import { Configuration } from '../../app-config';


@Injectable({
  providedIn: 'root'
})
export class ProfileService{

  //private use_mockup_user: boolean = true;

  //private config = new Configuration();
  private is_loading_success: boolean = false;
  private is_loading_error: boolean = false;
  private message_result: string = "";

  private user_profile: Profile;

  private is_mokup_mode:boolean = false;
  //private baseAPI:string = '';

  constructor(protected http: HttpClient) {
    this.user_profile = new Profile();    
    // this.is_mokup_mode = isMockup;
  }
  //---------------------------------------------
  public mockupProfile() {

  }

  //---------------------------------------------
  //public checkTokenAndGetProfile(profile_url:string, token: string, is_mockup:boolean= false, callback_success: Function, callback_error: Function) {
  public checkTokenAndGetProfile(profile_url:string, token: string, user_mockup:any = null, callback_success: Function, callback_error: Function) {

    if (user_mockup!=null) {

      let is_admin: boolean = false;
      this.message_result = "load profile success";
      this.is_loading_success = true;
      this.user_profile.SetMockup(user_mockup);
      callback_success(is_admin, this.user_profile);
      return;
    }
    // ------------------------------
    
    let url = profile_url + "?token=" + token;
    // console.log('get profile from : ', url);
    // console.log('token :', token);

    this.http.get(url).toPromise<any>()
      .then(result => {
        //console.log('profile result : ', result);
        if (result.has_error == false) {
          let is_admin: boolean = false;

          this.message_result = "load profile success";
          this.is_loading_success = true;

          is_admin = result.data.is_admin;

          this.user_profile.SetUserFromDID(result.data.user);

          callback_success(is_admin, this.user_profile);

        } else {
          this.message_result = result.message;
          this.is_loading_success = true;
          this.user_profile = null;

          this.is_loading_error = true;
          this.message_result = result.message;

          callback_error(result.message);

        }

      })
      .catch(err => {
        console.log('Error : ', err);
        this.message_result = err.message;
        this.is_loading_success = true;
        this.is_loading_error = true;

        setTimeout(()=>{ callback_error(err.message); }, 3000);

        callback_error(err.message);
      });
  }
  //---------------------------------------------
  public get isLoadingSuccess(): boolean {
    return this.is_loading_success;
  }
  //---------------------------------------------
  public get isLoadingError(): boolean {
    return this.is_loading_error;
  }
  //---------------------------------------------
  public get message(): string {
    return this.message_result;
  }
  //---------------------------------------------
  public get profile() {
    return this.profile;
  }
  //---------------------------------------------
}
