import { Injectable } from '@angular/core';

import { DaffLoginInfo } from '../../../models/login-info'
import { DaffAccountRegistration } from '../../../models/account-registration'
import { DaffCustomerRegistration } from '../../../models/customer-registration'
import { LoginInfoTransformerInterface } from '../interfaces/login-info-transformer';

/**
 * Transforms magento auths into an object usable by daffodil.
 */
@Injectable({
  providedIn: 'root'
})
export class DaffMagentoLoginInfoTransformerService implements LoginInfoTransformerInterface<
  DaffAccountRegistration<DaffCustomerRegistration>,
  DaffCustomerRegistration,
  DaffLoginInfo
> {
  transform(registration: DaffAccountRegistration<DaffCustomerRegistration>): DaffLoginInfo {
    return {
      email: registration.customer.email,
      password: registration.password
    }
  }
}
