import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';

import {
  DaffCart,
  DaffCartItem,
  DaffCartItemInput,
} from '@daffodil/cart';
import { DaffCartItemServiceInterface } from '@daffodil/cart/driver';
import {
  DaffCartFactory,
  DaffCartItemFactory,
} from '@daffodil/cart/testing';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffTestingCartItemService implements DaffCartItemServiceInterface {
  constructor(
    private cartItemFactory: DaffCartItemFactory,
    private cartFactory: DaffCartFactory,
  ) {}

  list(cartId: DaffCart['id']): Observable<DaffCartItem[]> {
    return of(this.cartItemFactory.createMany(3));
  }

  get(cartId: DaffCart['id'], itemId: DaffCartItem['id']): Observable<DaffCartItem> {
    return of(this.cartItemFactory.create());
  }

  add(cartId: DaffCart['id'], input: DaffCartItemInput): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return of({
      response: this.cartFactory.create(),
      errors: [],
    });
  }

  update(
    cartId: DaffCart['id'],
    itemId: DaffCartItem['id'],
    item: Partial<DaffCartItem>,
  ): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return of({
      response: this.cartFactory.create(),
      errors: [],
    });
  }

  delete(cartId: DaffCart['id'], itemId: DaffCartItem['id']): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return of({
      response: this.cartFactory.create(),
      errors: [],
    });
  }
}
