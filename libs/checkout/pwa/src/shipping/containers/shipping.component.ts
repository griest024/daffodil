import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Observable,
  map,
  tap,
} from 'rxjs';

import { DaffCartShippingRate } from '@daffodil/cart';
import {
  DaffCartFacade,
  DaffCartShippingInformationUpdate,
  DaffCartStateModule,
} from '@daffodil/cart/state';

@Component({
  selector: '[daff-checkout-shipping-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'DaffCheckoutShippingContainer',
  standalone: true,
  imports: [
    DaffCartStateModule,
  ],
})
export class DaffCheckoutShippingContainer implements OnInit {
  selectedShippingOption$: Observable<DaffCartShippingRate>;
  shippingOptions$: Observable<Array<DaffCartShippingRate>>;
  isShippingOptionSelected$: Observable<boolean>;

  constructor(
    private cartFacade: DaffCartFacade,
  ) { }

  ngOnInit() {
    this.selectedShippingOption$ = this.cartFacade.cart$.pipe(
      map((cart) => cart.shipping_information),
    );
    this.shippingOptions$ = this.cartFacade.cart$.pipe(
      map((cart) => cart.available_shipping_methods),
      tap(console.log),
    );
  }

  updateShippingMethod(method: Partial<DaffCartShippingRate>) {
    this.cartFacade.dispatch(new DaffCartShippingInformationUpdate(method));
  }
}
