import { Injectable, Inject } from '@angular/core';
import { Observable, pipe, of, throwError } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { DaffLoginServiceInterface } from '../interfaces/login-service.interface';
import { DaffAuthQueryManager } from '../injection-tokens/auth-query-manager.token';
import { DaffAuthQueryManagerInterface } from '../interfaces/auth-query-manager.interface';
import { GenerateTokenResponse } from './models/outputs/generate-token-response';
import { DaffLoginInfo } from '../../models/login-info';
import { DaffAuthTransformer } from '../injection-tokens/auth-transformer.token';
import { DaffAuthTransformerInterface } from '../interfaces/auth-transformer.interface';
import { DaffAuthToken } from '../../models/auth-token';
import { DaffAccountRegistration } from '../../models/account-registration';
import { DaffCustomerRegistration } from '../../models/customer-registration';
import { RevokeCustomerTokenResponse } from './models/outputs/revoke-customer-token-response';
import { DaffMagentoRevokeTokenTransformerService } from './transforms/revoke-token-transformer.service';
import { RevokeTokenTransformerInterface } from './interfaces/revoke-token-transformer';

/**
 * Util pipe to get the data from an apollo result
 */
const unwrapResult = pipe(
  map(({data}) =>
    data
  )
);

@Injectable({
  providedIn: 'root'
})
export class DaffMagentoLoginService<
  TLoginInfo extends DaffLoginInfo,
  TAuthToken extends DaffAuthToken,
  TCustomerRegistration extends DaffCustomerRegistration,
  TAccountRegistration extends DaffAccountRegistration<TCustomerRegistration>,
  TGenerateTokenResponse extends GenerateTokenResponse,
  TRevokeCustomerTokenResponse extends RevokeCustomerTokenResponse
> implements DaffLoginServiceInterface<TLoginInfo, TAuthToken> {
  constructor(
    private apollo: Apollo,
    @Inject(DaffAuthQueryManager) public queryManager: DaffAuthQueryManagerInterface<
      TAccountRegistration,
      TCustomerRegistration,
      TLoginInfo
    >,
    @Inject(DaffAuthTransformer) public authTransformer: DaffAuthTransformerInterface<TAuthToken>,
    @Inject(DaffMagentoRevokeTokenTransformerService) public revokeTokenTransformer: RevokeTokenTransformerInterface<TRevokeCustomerTokenResponse>
  ) {}

  login(loginInfo: TLoginInfo): Observable<TAuthToken> {
    return this.apollo.mutate<TGenerateTokenResponse>(
      this.queryManager.generateATokenMutation(loginInfo)
    ).pipe(
      unwrapResult,
      map(data => this.authTransformer.transform(data))
    )
  }

  logout() {
    return this.apollo.mutate<TRevokeCustomerTokenResponse>(this.queryManager.revokeCustomerTokenMutation()).pipe(
      unwrapResult,
      map(resp => this.revokeTokenTransformer.transform(resp)),
      map(() => {})
      // TODO: determine if #logout should return an Error
      // switchMap((result: boolean): Observable<void> => result
      //   ? of()
      //   : throwError(new Error('Token revocation failed'))
      // )
    )
  }
}
