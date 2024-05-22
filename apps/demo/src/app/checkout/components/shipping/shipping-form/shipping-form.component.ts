import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DaffCartShippingRate } from '@daffodil/cart';
import { DaffButtonModule } from '@daffodil/design/button';

import { DemoCheckoutAddressFormComponent } from '../../forms/address-form/components/address-form/address-form.component';
import { DemoCheckoutShippingOptionsComponent } from '../shipping-options/components/shipping-options/shipping-options.component';
import { DemoCheckoutShippingFormFactory } from '../shipping-options/factories/shipping-option-form.factory';
import {
  DemoCheckoutShippingForm,
  DemoCheckoutShippingFormGroup,
} from '../shipping-options/models/shipping-form.type';

@Component({
  selector: 'demo-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
  standalone: true,
  imports: [
    DemoCheckoutAddressFormComponent,
    DemoCheckoutShippingOptionsComponent,
    ReactiveFormsModule,
    DaffButtonModule,
  ],
})
export class ShippingFormComponent implements OnInit {
  @Input() selectedOption: DaffCartShippingRate;
  @Input() options: Array<DaffCartShippingRate>;

  @Output() submitted = new EventEmitter<DemoCheckoutShippingForm>();

  form: DemoCheckoutShippingFormGroup;

  constructor(
    private shippingOptionFormFactory: DemoCheckoutShippingFormFactory,
  ) {}

  ngOnInit() {
    this.form = this.shippingOptionFormFactory.create({
      id: this.selectedOption?.id,
    });
    console.log(this.options);

  }

  onSubmit(form) {
    if(this.form.valid) {
      this.submitted.emit(form.value);
    }
  };
}
