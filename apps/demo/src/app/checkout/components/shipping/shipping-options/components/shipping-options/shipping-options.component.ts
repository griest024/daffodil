import {
  Component,
  Input,
  OnInit,
  DoCheck,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DaffCartShippingRate } from '@daffodil/cart';
import {
  DaffErrorStateMatcher,
  DaffRadioModule,
} from '@daffodil/design';

import { DemoCheckoutShippingFormGroup } from '../../models/shipping-form.type';

@Component({
  selector: 'demo-checkout-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DaffRadioModule,
  ],
})
export class DemoCheckoutShippingOptionsComponent implements OnInit, DoCheck {
  private errorStateMatcher: DaffErrorStateMatcher;

  @Input() formGroup: DemoCheckoutShippingFormGroup;
  @Input() submitted: boolean;
  @Input() options: DaffCartShippingRate[];

  errorState: boolean;

  ngOnInit() {
    this.errorStateMatcher = new DaffErrorStateMatcher();
  }

  ngDoCheck() {
    this.errorState = this.errorStateMatcher.isErrorState(this.formGroup.controls.id, this.submitted);
  }
}
