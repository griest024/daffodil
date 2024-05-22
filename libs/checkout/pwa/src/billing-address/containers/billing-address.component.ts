import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Observable,
  map,
} from 'rxjs';

import { DaffCartAddress } from '@daffodil/cart';
import {
  DaffCartFacade,
  DaffCartBillingAddressUpdate,
  DaffCartStateModule,
} from '@daffodil/cart/state';

@Component({
  selector: '[daff-checkout-billing-address-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'DaffCheckoutBillingAddressContainer',
  standalone: true,
  imports: [
    DaffCartStateModule,
  ],
})
export class DaffCheckoutBillingAddressContainer implements OnInit {
  billingAddress$: Observable<DaffCartAddress>;
  isBillingSameAsShipping$: Observable<boolean>;

  constructor(
    private cartFacade: DaffCartFacade,
  ) { }

  ngOnInit() {
    this.billingAddress$ = this.cartFacade.cart$.pipe(
      map((cart) => cart.billing_address),
    );
    this.isBillingSameAsShipping$ = this.cartFacade.isBillingSameAsShipping$;
  }

  updateBillingAddress(address: Partial<DaffCartAddress>) {
    this.cartFacade.dispatch(new DaffCartBillingAddressUpdate(address));
  }
}
