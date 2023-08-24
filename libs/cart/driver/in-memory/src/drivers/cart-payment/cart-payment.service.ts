import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
} from 'rxjs';

import {
  DaffCart,
  DaffCartPaymentMethod,
  DaffCartAddress,
} from '@daffodil/cart';
import { DaffCartPaymentServiceInterface } from '@daffodil/cart/driver';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffInMemoryCartPaymentService implements DaffCartPaymentServiceInterface {
  /**
   * The URL with which the driver makes calls to the backend.
   */
  readonly url = '/api/cart-payment';

  constructor(private http: HttpClient) {}

  get(cartId: DaffCart['id']): Observable<DaffCartPaymentMethod> {
    return this.http.get<DaffCartPaymentMethod>(`${this.url}/${cartId}`);
  }

  update(cartId: DaffCart['id'], payment: Partial<DaffCartPaymentMethod>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.put<DaffCart>(`${this.url}/${cartId}`, { payment }).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  updateWithBilling(
    cartId: DaffCart['id'],
    payment: Partial<DaffCartPaymentMethod>,
    address: Partial<DaffCartAddress>,
  ): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.put<DaffCart>(`${this.url}/${cartId}`, { payment, address }).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  remove(cartId: DaffCart['id']): Observable<void> {
    return this.http.delete<void>(`${this.url}/${cartId}`);
  }
}
