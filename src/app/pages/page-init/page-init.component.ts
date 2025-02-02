import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { ProfileService } from '../../shared/services/_profile.service';
import { TraderInformationService } from '../../shared/services/_trader-information.service';
import { DialogResult } from '../../shared/base/base-modal-dialog';
import { WaitingDialog } from '../../components/waiting-dialog/waiting-dialog.component';
import { ServerConfig } from '../../shared/models/result';
import { ServerConfigService } from './../../shared/services/_server-config.service';
//import { EventResult } from '../../shared/models/result';
//import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';


@Component({
  selector: 'cdss-page-init',
  templateUrl: './page-init.component.html',
  styleUrls: ['./page-init.component.css']
})
export class PageInitComponent implements OnInit {
  //---------------------------------------------
  // private popup: WaitingDialog;
  private error_message: string;

  private is_loading:boolean
  private current_loading: string;
  // S=>server config, P=>Profile, T=>Trader

  private waiting_millisecond = 50;

  // private loading_message_header = "Getering Information";
  // private loading_message_config = "Loading Server Information";
  // private loading_message_profile = "Loading Profile Information";
  // private loading_message_trader = "Loading Trader Information";
  private loading_message_header = "";
  private loading_message_config = "";
  private loading_message_profile = "";
  private loading_message_trader = "";

  //---------------------------------------------
  constructor(private app: ApplicationContext, private profile: ProfileService, private trader: TraderInformationService, private serverConfig: ServerConfigService) {
    // console.log('PageInitComponent');
    this.is_loading = false;
    this.current_loading = "";
    this.error_message = "";
  }
  //---------------------------------------------
  ngOnInit() {
    setTimeout(() => {
      this.validateTokenAndGetUserProfile();
    }, 50);
  }
  //---------------------------------------------
  // public initGeteringProcess(args: DialogResult) {
  //   this.popup = args.sender;

  //   setTimeout(() => {
  //     this.is_loading = true;
  //     this.popup.openDialog();
  //     this.validateTokenAndGetUserProfile();
  //   }, 50);

  // }
  //---------------------------------------------
  private validateTokenAndGetUserProfile() {

    this.app.ShowWaitingDialog(this.loading_message_config, this.loading_message_header);
    // this.getServerConfig(
    //   () => this.getProfile(
    //     () => this.getTraderInformation(
  //         () => this.completeLoadingAll()
    //     )
    //   )
    // );

      this.getProfile(
        () => this.getTraderInformation(
          ()=>this.getServerConfig(
            () => this.completeLoadingAll()
          )
        )
    );

    // this.getTraderInformation(()=>{});
  }
  //---------------------------------------------
  //---------------------------------------------
  private getServerConfig(next: Function) {

    this.current_loading = "S";

    this.serverConfig.loadToken((token:any)=>{
      this.app.eLicensingToken = token;
      setTimeout(() => next(), this.waiting_millisecond);
    }, (errMessage: string)=>{
        this.setMessagError('get token error : ' + errMessage);
    });

    // console.log('getServerConfig done');
    // next();
  }
  //---------------------------------------------
  private getProfile(next: Function) {

    this.current_loading = "P";
    let url = this.app.Configuration.profile_url;
    this.app.ShowWaitingDialog(this.loading_message_profile, this.loading_message_header);
    // -----------------------------------
    this.profile.checkTokenAndGetProfile(url, this.app.token, this.app.Configuration.mockup_user,
      (is_admin, userProfile) => {
        this.app.IsAdmin = is_admin;
        this.app.currentUser = userProfile;
        // console.log('getProfile done');
        setTimeout(() => next(), this.waiting_millisecond);
      },
      errMessage => {
        this.setMessagError('get profile error : ' + errMessage);
      });
  }
  //---------------------------------------------
  private getTraderInformation(next: Function) {

    this.current_loading = "T";
    this.app.ShowWaitingDialog(this.loading_message_trader, this.loading_message_header);

    this.trader.loadTrader(this.app.currentUser.trader_id, (traderInfo) => {
      this.app.traderInformation = traderInfo;
      // console.log('getTraderInformation done');
      setTimeout(() => next(), this.waiting_millisecond);
    }, errMessage => {
        this.setMessagError('get trader information error : ' + errMessage);
    });
  }
  //---------------------------------------------
  //---------------------------------------------
  private setFooter() {

    //console.log('Configuration : ', this.app.Configuration);
    //console.log('this.app.getAppDetailForFooter : ', this.app.getAppDetailForFooter);
    document.getElementById("span-user").innerHTML = "ผู้ใช้ระบบ " + this.app.currentUser.user_name;
    document.getElementById("div-footer_left").innerHTML = this.app.getAppDetailForFooter;
    document.getElementById("div-footer_right").innerHTML = this.app.getUserDetailForFooter;

  }
  //---------------------------------------------
  public get isLoadProfileComplete(): boolean {
    return this.profile.isLoadingSuccess;
  }
  //---------------------------------------------
  public get isLoadProfileError(): boolean {
    return (this.profile.isLoadingSuccess && this.profile.isLoadingError);
  }
  //---------------------------------------------
  public get messageOfProfileError():string{
    return this.profile.message;
  }
  //---------------------------------------------
  private completeLoadingAll() {
    setTimeout(() => {
      // console.log('completeLoadingAll');
      this.setFooter();
      this.app.CloseWaitingDialog();
      // console.log('app-context : ', this.app);
      this.app.gotoHome(false);
    }, 50);
  }
  //---------------------------------------------
  private setMessagError(msg) {

    console.log('Message Error : ', msg);
    console.log('go to DID in ' + (this.waiting_millisecond/1000) + ' second.');

    let message = this.app.Message.initial_error+"<br />"+msg;

    this.app.ShowWaitingDialog(message);

    this.error_message = message;

    setTimeout(() => {
      // this.popup.closeDialog();
      // this.popup.closeAllDialog();
      this.app.CloseWaitingDialogWithError(msg);
      this.app.gotoLogin();
    }, this.waiting_millisecond);

  }
  //---------------------------------------------
  //---------------------------------------------
  public get ErrorMessage(): string {
    return this.error_message;
  }
  //---------------------------------------------
  public get HasError(): boolean {
    return this.error_message.length > 0;
  }
  //---------------------------------------------
  public get IsInformationLoading(): boolean {
    return this.is_loading;
  }
  //---------------------------------------------
  public get IsLoadServerConfig(): boolean {
    return this.current_loading == "S";
  }
  //---------------------------------------------
  public get IsLoadProfile(): boolean {
    return this.current_loading=="P";
  }
  //---------------------------------------------
  public get IsLoadTraderInformation(): boolean {
    return this.current_loading == "T";
  }
  //---------------------------------------------
  //---------------------------------------------
}
