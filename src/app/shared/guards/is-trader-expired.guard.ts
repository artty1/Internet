import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationContext } from '../../application-context';

@Injectable({
  providedIn: 'root'
})
export class IsTraderExpiredGuard implements CanActivate{

  constructor(private app: ApplicationContext) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.app.isTraderExpire;
  }

}

export class IsLogin implements CanActivate {

  constructor(private app: ApplicationContext) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.app.isLogin;
  }

}
