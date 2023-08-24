import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  throwError,
} from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

import { DaffCart } from '@daffodil/cart';
import {
  DaffCartServiceInterface,
  DaffCartNotFoundError,
} from '@daffodil/cart/driver';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffInMemoryCartService implements DaffCartServiceInterface {
  /**
   * The URL with which the driver makes calls to the backend.
   */
  readonly url = '/api/cart';

  constructor(private http: HttpClient) {}

  get(cartId: DaffCart['id']): Observable<DaffDriverResponse<DaffCart>> {
    return this.http.get<DaffCart>(`${this.url}/${cartId}`).pipe(
      catchError((error: Error) => throwError(() => new DaffCartNotFoundError(error.message))),
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  addToCart(productId: string, qty: number): Observable<DaffCart> {
    return this.http.post<DaffCart>(this.url + '/addToCart', { productId, qty });
  }

  clear(cartId: DaffCart['id']): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.post<Partial<DaffCart>>(`${this.url}/${cartId}/clear`, {}).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  create(): Observable<{id: DaffCart['id']}> {
    return this.http.post<{id: DaffCart['id']}>(this.url, {});
  }

  merge(guestCart: DaffCart['id'], customerCart?: DaffCart['id']): Observable<DaffDriverResponse<DaffCart>> {
    return this.http.post<DaffCart>(`${this.url}/${guestCart}/merge`, {
      source: guestCart,
      destination: customerCart,
    }).pipe(
      catchError((error: Error) => throwError(() => new DaffCartNotFoundError(error.message))),
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }
}
