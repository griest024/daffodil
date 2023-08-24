import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';

import {
  DaffCart,
  DaffCartAddress,
} from '@daffodil/cart';
import { DaffCartBillingAddressServiceInterface } from '@daffodil/cart/driver';
import {
  DaffCartAddressFactory,
  DaffCartFactory,
} from '@daffodil/cart/testing';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffTestingCartBillingAddressService implements DaffCartBillingAddressServiceInterface {
  constructor(
    private addressFactory: DaffCartAddressFactory,
    private cartFactory: DaffCartFactory,
  ) {}

  get(cartId: DaffCart['id']): Observable<DaffCartAddress> {
    return of(this.addressFactory.create());
  }

  update(cartId: DaffCart['id'], address: DaffCartAddress): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return of({
      response: this.cartFactory.create(),
      errors: [],
    });
  }
}
