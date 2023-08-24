import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { DaffCart } from '@daffodil/cart';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * The interface responsible for managing a customer's cart.
 */
export interface DaffCartServiceInterface<T extends DaffCart = DaffCart> {
  /**
   * Retrieve a cart
   */
  get(id: T['id']): Observable<DaffDriverResponse<T>>;

  /**
   * Creates a cart.
   */
  create(): Observable<{id: T['id']}>;

  /**
   * @deprecated
   * Prefer DaffCartItemServiceInterface.add
   *
   * Add an item to the cart.
   */
  addToCart(productId: string, qty: number): Observable<T>;

  /**
   * Remove all items from a cart.
   */
  clear(id: T['id']): Observable<DaffDriverResponse<Partial<T>>>;

  /**
   * Merge a guest cart into a customer cart.
   */
  merge(guestCart: T['id'], customerCart?: T['id']): Observable<DaffDriverResponse<T>>;
}

export const DaffCartDriver = new InjectionToken<DaffCartServiceInterface>(
  'DaffCartDriver',
);
