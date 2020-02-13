import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  DaffAccountRegistration,
  DaffLoginInfo,
  DaffRegisterServiceInterface,
  DaffCustomerRegistration,
} from '@daffodil/auth';

import { DaffAccountRegistrationFactory } from '../../../factories/account-registration.factory';

@Injectable({
  providedIn: 'root'
})
export class DaffTestingRegisterService implements DaffRegisterServiceInterface<
  DaffAccountRegistration<DaffCustomerRegistration>,
  DaffCustomerRegistration,
  DaffLoginInfo
> {
  constructor (private factory: DaffAccountRegistrationFactory) {}

  register(registration: DaffAccountRegistration<DaffCustomerRegistration>): Observable<DaffLoginInfo> {
    return of({
      email: registration.customer.email,
      password: registration.password
    });
  }
}
