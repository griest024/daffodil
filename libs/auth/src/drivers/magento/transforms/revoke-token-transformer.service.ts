import { Injectable } from '@angular/core';

import { RevokeTokenTransformerInterface } from '../interfaces/revoke-token-transformer';
import { RevokeCustomerTokenResponse } from '../models/outputs/revoke-customer-token-response';

/**
 * Transforms magento auths into an object usable by daffodil.
 */
@Injectable({
  providedIn: 'root'
})
export class DaffMagentoRevokeTokenTransformerService implements RevokeTokenTransformerInterface<
  RevokeCustomerTokenResponse
> {
  transform(response: RevokeCustomerTokenResponse): boolean {
    return response.revokeCustomerToken.result;
  }
}
