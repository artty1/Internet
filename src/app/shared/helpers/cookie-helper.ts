export class CookieHelper {

  constructor() {

  }

  public get(nameOfCookie: string): any {
    var v = document.cookie.match('(^|;) ?' + nameOfCookie + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  public set(nameOfCookie: string, data: any, expireCount: number = 1) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * expireCount);
    document.cookie = nameOfCookie + "=" + data + ";path=/;expires=" + d.toUTCString();
  }

  public delete(nameOfCookie: string) {
    this.set(nameOfCookie, '', -1);
  }

  public deleteAll() {
    document.cookie = "";
  }
}

