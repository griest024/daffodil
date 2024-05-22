import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Observable } from 'rxjs';

import { DaffCart } from '@daffodil/cart';
import { DaffCartFacade } from '@daffodil/cart/state';
import {
  DaffCheckoutBillingAddressContainer,
  DaffCheckoutOrderContainer,
  DaffCheckoutPaymentContainer,
  DaffCheckoutShippingAddressContainer,
  DaffCheckoutShippingContainer,
} from '@daffodil/checkout/pwa';
import { DaffAccordionModule } from '@daffodil/design/accordion';
import { DaffContainerModule } from '@daffodil/design/container';
import { DaffLoadingIconModule } from '@daffodil/design/loading-icon';

import { CartSummaryWrapperModule } from '../../../cart/components/cart-summary-wrapper/cart-summary-wrapper.module';
import { DemoCompleteAddressStep } from '../../actions/checkout-step.actions';
import { DemoCheckoutAddressForm } from '../../components/forms/address-form/models/address-form.type';
import { PaymentFormComponent } from '../../components/payment/payment-form/payment-form.component';
import { PaymentSummaryComponent } from '../../components/payment/payment-summary/payment-summary.component';
import { PlaceOrderModule } from '../../components/place-order/place-order.module';
import { ShippingFormComponent } from '../../components/shipping/shipping-form/shipping-form.component';
import { DemoCheckoutShippingAddressFormComponent } from '../../components/shipping-address/form/shipping-address-form.component';
import { DemoCheckoutShippingAddressSummaryComponent } from '../../components/shipping-address/summary/shipping-address-summary.component';
import {
  DemoCheckoutStep,
  DemoCheckoutStepService,
} from '../../step/public_api';

@Component({
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    DaffContainerModule,
    DaffLoadingIconModule,
    DaffAccordionModule,
    DaffCheckoutBillingAddressContainer,
    DaffCheckoutShippingAddressContainer,
    DaffCheckoutShippingContainer,
    DaffCheckoutPaymentContainer,
    DaffCheckoutOrderContainer,

    DemoCheckoutShippingAddressFormComponent,
    DemoCheckoutShippingAddressSummaryComponent,
    PlaceOrderModule,
    PaymentFormComponent,
    PaymentSummaryComponent,
    ShippingFormComponent,
    CartSummaryWrapperModule,
  ],
})
export class CheckoutViewComponent implements OnInit {
  readonly DemoCheckoutStep = DemoCheckoutStep;

  cart$: Observable<DaffCart>;
  loading$: Observable<boolean>;
  currentStep$: Observable<DemoCheckoutStep>;
  stepCompletion$: Observable<Record<DemoCheckoutStep, boolean>>;

  constructor(
    private cartFacade: DaffCartFacade,
    private stepService: DemoCheckoutStepService,
  ) { }

  ngOnInit() {
    this.cart$ = this.cartFacade.cart$;
    this.loading$ = this.cartFacade.loading$;
    this.currentStep$ = this.stepService.currentStep$;
    this.stepCompletion$ = this.stepService.stepCompletion$;
  }

  onUpdateShippingAddress(address: DemoCheckoutAddressForm) {
    this.cartFacade.dispatch(
      new DemoCompleteAddressStep({
        ...address,
        address_type: 'shipping',
        region: address.state,
        id: null,
      }),
    );
  }
}
