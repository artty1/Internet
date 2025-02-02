import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private data: Array<PaymentMethod>;

  //------------------------------------------------------
  constructor() {
    this.init();
  }
  //------------------------------------------------------
  private init() {

    this.data = new Array();

    this.data.push({ client_code: '', server_code : null, title: 'วิธีการชำระเงิน' });
    this.data.push({ client_code: 'C', server_code: '', title: 'เงินสด-เช็ค' });
    this.data.push({ client_code: 'B', server_code: 'B', title: 'Bill Payment' });
    this.data.push({ client_code: 'N', server_code: 'N', title: 'NSW E-Payment' });

  }
  //------------------------------------------------------
  public get PaymentMethodList():Array<PaymentMethod> {
    return this.data;
  }
  //------------------------------------------------------
  public getClientCodeFromSercerCode(serverCode:string): string {

    let result: string = this.data[0].client_code;

    for (let item of this.data) {
      if (item.server_code == serverCode) {
        result = item.client_code;
        break;
      }
    }

    return result;
  }
  // -------------------------------------------------------
}
