import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  DaffInputModule,
  DaffNativeSelectModule,
} from '@daffodil/design';
import { DaffButtonModule } from '@daffodil/design/button';
import { DaffPersonalAddress } from '@daffodil/geography';

import { PaymentFormGroup } from './models/payment-form.type';
import { EnablePlaceOrderButton } from '../../../actions/checkout.actions';
import { DemoCheckoutAddressFormComponent } from '../../forms/address-form/components/address-form/address-form.component';
import { DemoCheckoutAddressFormFactory } from '../../forms/address-form/factories/address-form.factory';
import { PaymentInfoFormFactory } from '../payment-info-form/factories/payment-info-form.factory';
import { PaymentInfoFormModule } from '../payment-info-form/payment-info-form.module';

@Component({
  selector: 'demo-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DaffInputModule,
    DaffNativeSelectModule,
    PaymentInfoFormModule,
    DaffButtonModule,
    DemoCheckoutAddressFormComponent,
  ],
})
export class PaymentFormComponent implements OnInit {

  @Input() paymentInfo: any;
  @Input() billingAddress: DaffPersonalAddress;
  @Input() billingAddressIsShippingAddress: boolean;
  @Output() updatePaymentInfo: EventEmitter<any> = new EventEmitter();
  @Output() updateBillingAddress: EventEmitter<any> = new EventEmitter();
  @Output() toggleBillingAddressIsShippingAddress: EventEmitter<any> = new EventEmitter();

  form: PaymentFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private paymentInfoFormFactory: PaymentInfoFormFactory,
    private addressFormFactory: DemoCheckoutAddressFormFactory,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      paymentInfo: this.paymentInfoFormFactory.create(this.paymentInfo),
      address: this.addressFormFactory.create(this.billingAddress),
    });
  }

  onSubmit() {
    if(this.billingAddressIsShippingAddress && this.form.controls.paymentInfo.valid) {
      this.updatePaymentInfo.emit(
        this.form.value.paymentInfo,
      );
    } else if (this.form.valid) {
      this.updatePaymentInfo.emit(
        this.form.value.paymentInfo,
      );

      this.updateBillingAddress.emit(
        this.form.value.address,
      );
    }
  };
}
