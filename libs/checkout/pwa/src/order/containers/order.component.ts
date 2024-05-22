import {
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import {
  DaffCartFacade,
  DaffCartStateModule,
} from '@daffodil/cart/state';
import { DaffCheckoutPlacedOrderFacade } from '@daffodil/checkout/state';
import { DaffOrder } from '@daffodil/order';

@Component({
  selector: '[daff-checkout-order-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'DaffCheckoutOrderContainer',
  standalone: true,
  imports: [
    DaffCartStateModule,
  ],
})
export class DaffCheckoutOrderContainer implements OnInit {

  order$: Observable<DaffOrder>;
  loading$: Observable<boolean>;

  constructor(
    private facade: DaffCheckoutPlacedOrderFacade,
    private cartFacade: DaffCartFacade,
  ) { }

  ngOnInit() {
    this.order$ = this.facade.placedOrder$;
    this.loading$ = this.cartFacade.orderResultLoading$;
  }
}
