import { FormGroup } from '@angular/forms';

import { DemoCheckoutAddressFormGroup } from '../../../forms/address-form/models/address-form.type';
import { PaymentInfoFormGroup } from '../../payment-info-form/models/payment-form.type';

export type PaymentFormGroup = FormGroup<{
  paymentInfo: PaymentInfoFormGroup;
  address: DemoCheckoutAddressFormGroup;
}>;


