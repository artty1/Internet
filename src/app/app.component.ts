import { Component, ApplicationModule, ApplicationRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApplicationContext } from './application-context';
// import { APP_BASE_HREF } from '@angular/common';
import { WaitingDialog } from './components/waiting-dialog/waiting-dialog.component';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
// import { MessageDialog } from './components/message-dialog/message-dialog.component';
import { ErrorDialog } from './components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild("waitingDialog", { static: false })waitingDialog: WaitingDialog;
  @ViewChild("errorDialog", { static: false })errorDialog: ErrorDialog;

    constructor(public app: ApplicationContext, private router:Router) {
      // console.log('ApplicationModule : ', ApplicationModule);
      // console.log('ApplicationRef : ', ApplicationRef);
      // console.log('APP_BASE_HREF : ', APP_BASE_HREF);

      router.events.subscribe((event:RouterEvent)=>{
        setTimeout(() => {
          this.initLoadingModule(event);
        }, 10);
        // if(event instanceof RouteConfigLoadStart){
        //   let eventDetail = <RouteConfigLoadStart> event;
        //   this.app.ShowWaitingDialog("Loading Module...");
        // }else if(event instanceof RouteConfigLoadEnd){
        //   this.app.CloseWaitingDialog();
        // }

      });

      // console.log('app component');

    }
    private initLoadingModule(event: RouterEvent){
      if(event instanceof RouteConfigLoadStart){
        let eventDetail = <RouteConfigLoadStart> event;
        this.app.ShowWaitingDialog("Loading Module...");
      }else if(event instanceof RouteConfigLoadEnd){
        this.app.CloseWaitingDialog();
      }
    }
    public get UserDetail():string{
      return this.app.currentUser.user_name;
    }
    // -------------------------------------
    public get IsUserLogin(): boolean {
      return this.app.isLogin;
    }
    // -------------------------------------
    ngAfterViewInit():void{
      // console.log('set wait dialog');
      this.app.SetMainDialog(this.waitingDialog, this.errorDialog);
      // this.app.SetMainDialog(this.waitingDialog);
    }
    // -------------------------------------
    public get WaitingMessage():string{
      return this.app.WaitingMessage;
    }
    public get isShowLoadingImage():boolean{
      return this.app.isShowLoadingImage;
    }


}

//https://bootstrap-datepicker.readthedocs.io
//https://bootstrap-datepicker.readthedocs.io/en/latest/markup.html
//https://www.flaticon.com/free-icon/magnifier_34202#term=search&page=1&position=4
