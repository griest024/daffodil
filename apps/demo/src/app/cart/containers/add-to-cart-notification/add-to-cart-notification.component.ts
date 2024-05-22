import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Observable,
  map,
} from 'rxjs';

import { DaffCartItem } from '@daffodil/cart';
import {
  DaffCartFacade,
  DaffCartItemStateReset,
} from '@daffodil/cart/state';
import {
  DaffOperationEntity,
  DaffState,
} from '@daffodil/core/state';
import { DaffProduct } from '@daffodil/product';
import { DaffProductFacade } from '@daffodil/product/state';

import { DemoAddToCartNotificationComponent } from '../../components/add-to-cart-notification/add-to-cart-notification.component';

const CART_ITEM_STATES = [
  DaffState.Mutating,
  DaffState.Added,
  DaffState.Adding,
  DaffState.Mutated,
  DaffState.Error,
];

@Component({
  selector: 'demo-add-to-cart-notification-container',
  templateUrl: './add-to-cart-notification.component.html',
  styleUrls: ['./add-to-cart-notification.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DemoAddToCartNotificationComponent,
  ],
})
export class DemoAddToCartNotificationContainer implements OnInit {
  cartItemsWithState$: Observable<Array<DaffOperationEntity<DaffCartItem>>>;
  cartItemCount$: Observable<number>;

  constructor(
    private cartFacade: DaffCartFacade,
    private productFacade: DaffProductFacade,
  ) { }

  ngOnInit() {
    this.cartItemsWithState$ = this.cartFacade.itemDictionary$.pipe(
      map(Object.values),
      map((items) => items.filter(({ daffState }) => CART_ITEM_STATES.includes(daffState))),
    );
    this.cartItemCount$ = this.cartFacade.totalItems$;
  }

  getProduct(id: DaffProduct['id']) {
    return this.productFacade.getProduct(id);
  }

  onHide(itemId: DaffCartItem['id']) {
    this.cartFacade.dispatch(new DaffCartItemStateReset(itemId));
  }
}
