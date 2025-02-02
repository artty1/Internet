import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';
import { BaseSection } from './../../shared/base/base-section';

@Component({
  selector: 'cdss-section-payment-type',
  templateUrl: './section-payment-type.component.html',
  styleUrls: ['./section-payment-type.component.css']
})
export class SectionPaymentTypeComponent extends BaseSection implements OnInit {

  //public selectedPaymentMethod: string;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected lookup: LookupService) {
    super(app, repo);
    this.title = 'วิธีการชำระเงิน';

    //this.is_hidden = false;

  }

  ngOnInit() {
  }

  public get currentPaymentTypeName(): string {
    return this.repo.PaymentMethodName;
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    
    if (!forSubmit) return true;

    // ---------------------------------
    let result: boolean = true;

    if (this.repo.currentDocument.LogicOfDocument.payment_method == "") {
      result = false;
      this.app.setValidateControl('paymentTypeDropdown', false);

      if (isFocusToField) this.app.scrollToElement('div-section-payment-type');
    }
    // ---------------------------------
    return result;
  }
  // ------------------------------------------------------
  // ----------------------------------------
 
  // ----------------------------------------
  public get selectedPaymentMethod(): string {
    // console.log('selectedPaymentMethod : ', );
    return this.repo.currentDocument.LogicOfDocument.payment_method;
  }
  public set selectedPaymentMethod(value: string) {
    //console.log('selectedPaymentMethod : ', value);
    this.repo.PaymentMethod = value;
    this.repo.currentDocument.LogicOfDocument.payment_method = value;
    this.repo.currentDocument.PAYMENT_METHOD = value;
  }
  public changePaymenyMethod() {
    this.app.setValidateControl('paymentTypeDropdown', true);
  }

  public get PaymentList():Array<any> {
    return this.repo.PaymentMethodList;
  }
}
