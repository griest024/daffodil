import { RevokeCustomerTokenResponse } from '../models/outputs/revoke-customer-token-response';

export interface RevokeTokenTransformerInterface<
  TRevokeCustomerTokenResponse extends RevokeCustomerTokenResponse
> {
  transform(response: TRevokeCustomerTokenResponse): boolean
}
