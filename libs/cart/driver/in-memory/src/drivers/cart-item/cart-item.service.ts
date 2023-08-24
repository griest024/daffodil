import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
} from 'rxjs';

import {
  DaffCartItem,
  DaffCartItemInput,
  DaffCart,
} from '@daffodil/cart';
import { DaffCartItemServiceInterface } from '@daffodil/cart/driver';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffInMemoryCartItemService implements DaffCartItemServiceInterface<
DaffCartItem,
DaffCartItemInput,
DaffCart
> {
  /**
   * The URL with which the driver makes calls to the backend.
   */
  readonly url = '/api/cart-items';

  constructor(private http: HttpClient) {}

  list(cartId: DaffCart['id']): Observable<DaffCartItem[]> {
    return this.http.get<DaffCartItem[]>(`${this.url}/${cartId}/`);
  }

  get(cartId: DaffCart['id'], itemId: DaffCartItem['id']): Observable<DaffCartItem> {
    return this.http.get<DaffCartItem>(`${this.url}/${cartId}/${itemId}`);
  }

  add(cartId: DaffCart['id'], input: DaffCartItemInput): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.post<Partial<DaffCart>>(`${this.url}/${cartId}/`, input).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  update(
    cartId: DaffCart['id'],
    itemId: DaffCartItem['id'],
    item: Partial<DaffCartItem>,
  ): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.put<Partial<DaffCart>>(`${this.url}/${cartId}/${itemId}`, item).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }

  delete(cartId: DaffCart['id'], itemId: DaffCartItem['id']): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.http.delete<Partial<DaffCart>>(`${this.url}/${cartId}/${itemId}`).pipe(
      map(result => ({
        response: result,
        errors: [],
      })),
    );
  }
}
