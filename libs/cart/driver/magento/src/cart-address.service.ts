import {
  Injectable,
  Inject,
} from '@angular/core';
import { DocumentNode } from 'graphql';
import {
  Observable,
  throwError,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  DaffCartAddress,
  DaffCart,
} from '@daffodil/cart';
import { DaffCartAddressServiceInterface } from '@daffodil/cart/driver';
import { DaffQueuedApollo } from '@daffodil/core/graphql';
import { DaffDriverResponse } from '@daffodil/driver';
import { daffDriverMagentoResponse } from '@daffodil/driver/magento';

import { transformCartMagentoError } from './errors/transform';
import { DAFF_MAGENTO_CART_MUTATION_QUEUE } from './injection-tokens/cart-mutation-queue.token';
import { DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS } from './injection-tokens/public_api';
import { MagentoCartAddressInput } from './models/public_api';
import {
  updateAddress,
  updateAddressWithEmail,
} from './queries/public_api';
import { DaffMagentoCartAddressInputTransformer } from './transforms/inputs/cart-address.service';
import { DaffMagentoCartTransformer } from './transforms/outputs/cart.service';

/**
 * A service for making Magento GraphQL queries for carts.
 *
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffMagentoCartAddressService implements DaffCartAddressServiceInterface {
  constructor(
    @Inject(DAFF_MAGENTO_CART_MUTATION_QUEUE) private mutationQueue: DaffQueuedApollo,
    @Inject(DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS) private extraCartFragments: DocumentNode[],
    private cartTransformer: DaffMagentoCartTransformer,
    private cartAddressInputTransformer: DaffMagentoCartAddressInputTransformer,
  ) {}

  update(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return address.email ? this.updateAddressWithEmail(cartId, address) : this.updateAddress(cartId, address);
  }

  private getAddressInput(address: Partial<DaffCartAddress>): {
    address?: MagentoCartAddressInput;
    addressId?: number;
  } {
    return address.id
      ? {
        addressId: Number(address.id),
      }
      : {
        address: this.cartAddressInputTransformer.transform(address),
      };
  }

  private updateAddress(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.mutationQueue.mutate({
      mutation: updateAddress(this.extraCartFragments),
      variables: {
        ...this.getAddressInput(address),
        cartId,
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (resp) => this.cartTransformer.transform(resp.setShippingAddressesOnCart.cart),
        (error) => transformCartMagentoError(error),
      ),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }

  private updateAddressWithEmail(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<DaffDriverResponse<Partial<DaffCart>>> {
    return this.mutationQueue.mutate({
      mutation: updateAddressWithEmail(this.extraCartFragments),
      variables: {
        ...this.getAddressInput(address),
        cartId,
        email: address.email,
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }).pipe(
      daffDriverMagentoResponse(
        (resp) => this.cartTransformer.transform(resp.setGuestEmailOnCart.cart),
        (error) => transformCartMagentoError(error),
      ),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }
}
