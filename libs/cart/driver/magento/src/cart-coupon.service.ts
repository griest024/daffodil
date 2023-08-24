import {
  Injectable,
  Inject,
} from '@angular/core';
import { DocumentNode } from 'graphql';
import {
  throwError,
  Observable,
} from 'rxjs';
import {
  map,
  catchError,
} from 'rxjs/operators';

import {
  DaffCart,
  DaffCartCoupon,
} from '@daffodil/cart';
import { DaffCartCouponServiceInterface } from '@daffodil/cart/driver';
import { DaffQueuedApollo } from '@daffodil/core/graphql';
import { DaffDriverResponse } from '@daffodil/driver';
import { daffDriverMagentoResponse } from '@daffodil/driver/magento';

import { transformCartMagentoError } from './errors/transform';
import { DAFF_MAGENTO_CART_MUTATION_QUEUE } from './injection-tokens/cart-mutation-queue.token';
import { DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS } from './injection-tokens/public_api';
import {
  listCartCoupons,
  applyCoupon,
  removeAllCoupons,
} from './queries/public_api';
import { daffMagentoCouponTransform } from './transforms/outputs/cart-coupon';
import { DaffMagentoCartTransformer } from './transforms/outputs/cart.service';

/**
 * A service for making Magento GraphQL queries for carts.
 *
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffMagentoCartCouponService implements DaffCartCouponServiceInterface {
  constructor(
    @Inject(DAFF_MAGENTO_CART_MUTATION_QUEUE) private mutationQueue: DaffQueuedApollo,
    @Inject(DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS) private extraCartFragments: DocumentNode[],
    private cartTransformer: DaffMagentoCartTransformer,
  ) {}

  apply(cartId: DaffCart['id'], coupon: DaffCartCoupon): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.mutationQueue.mutate({
      mutation: applyCoupon(this.extraCartFragments),
      variables: {
        cartId,
        couponCode: coupon.code,
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (data) => this.cartTransformer.transform(data.applyCouponToCart.cart),
        (error) => transformCartMagentoError(error, coupon),
      ),
      catchError(err => throwError(() => transformCartMagentoError(err, coupon))),
    );
  }

  list(cartId: DaffCart['id']): Observable<DaffCartCoupon[]> {
    return this.mutationQueue.mutate({
      mutation: listCartCoupons(this.extraCartFragments),
      variables: {
        cartId,
      },
      fetchPolicy: 'network-only',
    }).pipe(
      map(result => result.data.cart.applied_coupons.map(daffMagentoCouponTransform)),
      catchError(err => throwError(() => transformCartMagentoError(err))),
    );
  }

  remove(cartId: DaffCart['id'], coupon: DaffCartCoupon): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.removeAll(cartId);
  }

  removeAll(cartId: DaffCart['id']): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.mutationQueue.mutate({
      mutation: removeAllCoupons(this.extraCartFragments),
      variables: {
        cartId,
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (data) => this.cartTransformer.transform(data.removeCouponFromCart.cart),
        (error) => transformCartMagentoError(error),
      ),
      catchError(err => throwError(() => transformCartMagentoError(err))),
    );
  }
}
