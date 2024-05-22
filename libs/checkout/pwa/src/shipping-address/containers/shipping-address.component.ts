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
  DaffCartShippingAddressUpdate,
  DaffCartStateModule,
} from '@daffodil/cart/state';

@Component({
  selector: '[daff-checkout-shipping-address-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'DaffCheckoutShippingAddressContainer',
  standalone: true,
  imports: [
    DaffCartStateModule,
  ],
})
export class DaffCheckoutShippingAddressContainer implements OnInit {
  shippingAddress$: Observable<DaffCartAddress>;

  constructor(
    private cartFacade: DaffCartFacade,
  ) { }

  ngOnInit() {
    this.shippingAddress$ = this.cartFacade.cart$.pipe(
      map((cart) => cart.shipping_address),
    );
  }

  updateShippingAddress(address: Partial<DaffCartAddress>) {
    this.cartFacade.dispatch(new DaffCartShippingAddressUpdate(address));
  }
}
