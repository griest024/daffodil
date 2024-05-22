import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Observable,
  map,
} from 'rxjs';

import { DaffCartPaymentMethod } from '@daffodil/cart';
import {
  DaffCartFacade,
  DaffCartPaymentUpdate,
  DaffCartStateModule,
} from '@daffodil/cart/state';

@Component({
  selector: '[daff-checkout-payment-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'DaffCheckoutPaymentContainer',
  standalone: true,
  imports: [
    DaffCartStateModule,
  ],
})
export class DaffCheckoutPaymentContainer implements OnInit {
  paymentInfo$: Observable<DaffCartPaymentMethod>;

  constructor(
    private cartFacade: DaffCartFacade,
  ) { }

  ngOnInit() {
    this.paymentInfo$ = this.cartFacade.cart$.pipe(
      map((cart) => cart.payment),
    );
  }

  updatePaymentInfo(info: DaffCartPaymentMethod) {
    this.cartFacade.dispatch(new DaffCartPaymentUpdate(info));
  }
}
