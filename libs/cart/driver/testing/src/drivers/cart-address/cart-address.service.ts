import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';

import {
  DaffCart,
  DaffCartAddress,
} from '@daffodil/cart';
import { DaffCartAddressServiceInterface } from '@daffodil/cart/driver';
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
export class DaffTestingCartAddressService implements DaffCartAddressServiceInterface {
  constructor(
    private addressFactory: DaffCartAddressFactory,
    private cartFactory: DaffCartFactory,
  ) {}

  update(cartId: DaffCart['id'], address: DaffCartAddress): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return of({
      response: this.cartFactory.create(),
      errors: [],
    });
  }
}
