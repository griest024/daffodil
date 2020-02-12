import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { DaffRegisterServiceInterface } from '../interfaces/register-service.interface';
import { DaffAuthQueryManager } from '../injection-tokens/auth-query-manager.token';
import { DaffAuthQueryManagerInterface } from '../interfaces/auth-query-manager.interface';
import { DaffLoginDriver } from '../injection-tokens/login-driver.token';
import { DaffLoginServiceInterface } from '../interfaces/login-service.interface';
import { DaffLoginInfo } from '../../models/login-info';
import { DaffAuthToken } from '../../models/auth-token';
import { DaffCustomerRegistration } from '../../models/customer-registration';
import { DaffAccountRegistration } from '../../models/account-registration';
import { LoginInfoTransformerInterface } from './interfaces/login-info-transformer';
import { DaffMagentoLoginInfoTransformerService } from './transforms/login-info-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class DaffMagentoRegisterService<
  TLoginInfo extends DaffLoginInfo,
  TAuthToken extends DaffAuthToken,
  TCustomerRegistration extends DaffCustomerRegistration,
  TAccountRegistration extends DaffAccountRegistration<TCustomerRegistration>,
> implements DaffRegisterServiceInterface<
  TAccountRegistration,
  TCustomerRegistration,
  TAuthToken
> {
  constructor(
    private apollo: Apollo,
    @Inject(DaffAuthQueryManager) public queryManager: DaffAuthQueryManagerInterface<
      TAccountRegistration,
      TCustomerRegistration,
      TLoginInfo
    >,
    @Inject(DaffLoginDriver) private loginDriver: DaffLoginServiceInterface<TLoginInfo, TAuthToken>,
    @Inject(DaffMagentoLoginInfoTransformerService) private loginInfoTransformer: LoginInfoTransformerInterface<
      TAccountRegistration,
      TCustomerRegistration,
      TLoginInfo
    >
  ) {}

  register(registration: TAccountRegistration): Observable<TAuthToken> {
    return this.apollo.mutate(
      this.queryManager.createACustomerMutation(registration)
    ).pipe(
      mergeMap<any, Observable<TAuthToken>>((): Observable<TAuthToken> =>
        this.loginDriver.login(this.loginInfoTransformer.transform(registration))
      )
    )
  }
}
