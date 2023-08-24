import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import {
  DaffCart,
  DaffCartCoupon,
} from '@daffodil/cart';
import { DaffDriverResponse } from '@daffodil/driver';

/**
 * The interface responsible for applying a coupon to a cart.
 */
export interface DaffCartCouponServiceInterface<T extends DaffCart = DaffCart, V extends DaffCartCoupon = DaffCartCoupon> {
  /**
   * Apply a coupon to the cart and return a partial of the cart.
   */
  apply(cartId: T['id'], coupon: V): Observable<DaffDriverResponse<Partial<T>>>;

  /**
   * List coupon codes applied to a cart.
   */
  list(cartId: T['id']): Observable<V[]>;

  /**
   * Remove a coupon from the cart and return a partial of the cart.
   */
  remove(cartId: T['id'], coupon: V): Observable<DaffDriverResponse<Partial<T>>>;

  /**
   * Remove all coupons from the cart and return a partial of the cart.
   */
  removeAll(cartId: T['id']): Observable<DaffDriverResponse<Partial<T>>>;
}

export const DaffCartCouponDriver = new InjectionToken<DaffCartCouponServiceInterface>(
  'DaffCartCouponDriver',
);
