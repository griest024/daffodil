import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
} from 'rxjs';

import {
  DaffCart,
  DaffCartCoupon,
} from '@daffodil/cart';
import { DaffCartCouponServiceInterface } from '@daffodil/cart/driver';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffInMemoryCartCouponService implements DaffCartCouponServiceInterface {
  /**
   * The URL with which the driver makes calls to the backend.
   */
  readonly url = '/api/cart-coupon';

  constructor(private http: HttpClient) {}

  list(cartId: DaffCart['id']): Observable<DaffCartCoupon[]> {
    return this.http.get<DaffCartCoupon[]>(`${this.url}/${cartId}/`);
  }

  apply(cartId: DaffCart['id'], coupon: DaffCartCoupon): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.post<Partial<DaffCart>>(`${this.url}/${cartId}/`, coupon).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  remove(cartId: DaffCart['id'], coupon: DaffCartCoupon): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.delete<Partial<DaffCart>>(`${this.url}/${cartId}/${coupon.code}`).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  removeAll(cartId: DaffCart['id']): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.delete<Partial<DaffCart>>(`${this.url}/${cartId}/`).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }
}
