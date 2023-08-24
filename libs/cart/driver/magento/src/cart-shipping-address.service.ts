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
import { DaffCartShippingAddressServiceInterface } from '@daffodil/cart/driver';
import { DaffQueuedApollo } from '@daffodil/core/graphql';
import { DaffDriverResponse } from '@daffodil/driver';
import { daffDriverMagentoResponse } from '@daffodil/driver/magento';

import { transformCartMagentoError } from './errors/transform';
import { DAFF_MAGENTO_CART_MUTATION_QUEUE } from './injection-tokens/cart-mutation-queue.token';
import { DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS } from './injection-tokens/public_api';
import {
  getShippingAddress,
  updateShippingAddress,
  updateShippingAddressWithEmail,
  MagentoGetShippingAddressResponse,
  MagentoUpdateShippingAddressResponse,
  MagentoUpdateShippingAddressWithEmailResponse,
} from './queries/public_api';
import { DaffMagentoShippingAddressInputTransformer } from './transforms/inputs/shipping-address.service';
import { DaffMagentoCartTransformer } from './transforms/outputs/cart.service';
import { DaffMagentoShippingAddressTransformer } from './transforms/outputs/shipping-address.service';

/**
 * A service for making Magento GraphQL queries for a cart's shipping address.
 *
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffMagentoCartShippingAddressService implements DaffCartShippingAddressServiceInterface {
  constructor(
    private apollo: Apollo,
    @Inject(DAFF_MAGENTO_CART_MUTATION_QUEUE) private mutationQueue: DaffQueuedApollo,
    @Inject(DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS) private extraCartFragments: DocumentNode[],
    private cartTransformer: DaffMagentoCartTransformer,
    private shippingAddressTransformer: DaffMagentoShippingAddressTransformer,
    private shippingAddressInputTransformer: DaffMagentoShippingAddressInputTransformer,
  ) {}

  get(cartId: DaffCart['id']): Observable<DaffCartAddress> {
    return this.apollo.query({
      query: getShippingAddress(this.extraCartFragments),
      variables: { cartId },
      fetchPolicy: 'network-only',
    }).pipe(
      map(result => result.data.cart.shipping_addresses[0]
        ? this.shippingAddressTransformer.transform({
          ...result.data.cart.shipping_addresses[0],
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
      mutation: updateShippingAddress(this.extraCartFragments),
      variables: {
        cartId,
        address: this.shippingAddressInputTransformer.transform(address),
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (data) => this.cartTransformer.transform(data.setShippingAddressesOnCart.cart),
        (error) => transformCartMagentoError(error),
      ),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }

  private updateAddressWithEmail(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.mutationQueue.mutate({
      mutation: updateShippingAddressWithEmail(this.extraCartFragments),
      variables: {
        cartId,
        email: address.email,
        address: this.shippingAddressInputTransformer.transform(address),
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (data) => this.cartTransformer.transform({
          ...data.setShippingAddressesOnCart.cart,
          email: data.setGuestEmailOnCart.cart.email,
        }),
        (error) => transformCartMagentoError(error),
      ),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }
}
