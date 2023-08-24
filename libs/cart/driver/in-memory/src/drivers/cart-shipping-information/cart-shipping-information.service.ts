import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
} from 'rxjs';

import {
  DaffCartShippingRate,
  DaffCart,
} from '@daffodil/cart';
import { DaffCartShippingInformationServiceInterface } from '@daffodil/cart/driver';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffInMemoryCartShippingInformationService implements DaffCartShippingInformationServiceInterface<
DaffCartShippingRate,
DaffCart
> {
  /**
   * The URL with which the driver makes calls to the backend.
   */
  readonly url = '/api/cart-shipping-information';

  constructor(private http: HttpClient) {}

  get(cartId: DaffCart['id']): Observable<DaffCartShippingRate> {
    return this.http.get<DaffCartShippingRate>(`${this.url}/${cartId}`);
  }

  update(cartId: DaffCart['id'], info: Partial<DaffCartShippingRate>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.put<DaffCart>(`${this.url}/${cartId}`, info).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  delete(cartId: DaffCart['id']): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.delete<Partial<DaffCart>>(`${this.url}/${cartId}`).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }
}
