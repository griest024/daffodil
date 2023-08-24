import {
  Injectable,
  Inject,
} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import {
  Observable,
  throwError,
} from 'rxjs';
import {
  map,
  catchError,
} from 'rxjs/operators';

import {
  DaffCartAddress,
  DaffCart,
} from '@daffodil/cart';
import { DaffCartBillingAddressServiceInterface } from '@daffodil/cart/driver';
import { DaffQueuedApollo } from '@daffodil/core/graphql';
import { DaffDriverResponse } from '@daffodil/driver';
import { daffDriverMagentoResponse } from '@daffodil/driver/magento';

import { transformCartMagentoError } from './errors/transform';
import { DAFF_MAGENTO_CART_MUTATION_QUEUE } from './injection-tokens/cart-mutation-queue.token';
import { DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS } from './injection-tokens/public_api';
import {
  getBillingAddress,
  updateBillingAddress,
  updateBillingAddressWithEmail,
} from './queries/public_api';
import { DaffMagentoBillingAddressInputTransformer } from './transforms/inputs/billing-address.service';
import { DaffMagentoBillingAddressTransformer } from './transforms/outputs/billing-address.service';
import { DaffMagentoCartTransformer } from './transforms/outputs/cart.service';

/**
 * A service for making Magento GraphQL queries for carts.
 *
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffMagentoCartBillingAddressService implements DaffCartBillingAddressServiceInterface {
  constructor(
    private apollo: Apollo,
    @Inject(DAFF_MAGENTO_CART_MUTATION_QUEUE) private mutationQueue: DaffQueuedApollo,
    @Inject(DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS) private extraCartFragments: DocumentNode[],
    private cartTransformer: DaffMagentoCartTransformer,
    private billingAddressTransformer: DaffMagentoBillingAddressTransformer,
    private billingAddressInputTransformer: DaffMagentoBillingAddressInputTransformer,
  ) {}

  get(cartId: DaffCart['id']): Observable<DaffCartAddress> {
    return this.apollo.query({
      query: getBillingAddress(this.extraCartFragments),
      variables: { cartId },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      map(result => result.data.cart.billing_address
        ? this.billingAddressTransformer.transform({
          ...result.data.cart.billing_address,
          email: result.data.cart.email,
        })
        : null,
      ),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }

  update(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return address.email ? this.updateAddressWithEmail(cartId, address) : this.updateAddress(cartId, address);
  }

  private updateAddress(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.mutationQueue.mutate({
      mutation: updateBillingAddress(this.extraCartFragments),
      variables: {
        cartId,
        address: this.billingAddressInputTransformer.transform(address),
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (resp) => this.cartTransformer.transform(resp.setBillingAddressOnCart.cart),
        (error) => transformCartMagentoError(error),
      ),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }

  private updateAddressWithEmail(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.mutationQueue.mutate({
      mutation: updateBillingAddressWithEmail(this.extraCartFragments),
      variables: {
        cartId,
        email: address.email,
        address: this.billingAddressInputTransformer.transform(address),
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (resp) => this.cartTransformer.transform({
          ...resp.setBillingAddressOnCart.cart,
          email: resp.setGuestEmailOnCart.cart.email,
        }),
        (error) => transformCartMagentoError(error),
      ),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }
}
