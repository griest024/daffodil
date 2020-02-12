import { DaffAccountRegistration } from '../../../models/account-registration';
import { DaffCustomerRegistration } from '../../../models/customer-registration';
import { DaffLoginInfo } from '../../../models/login-info';

export interface LoginInfoTransformerInterface<
  TAccountRegistration extends DaffAccountRegistration<TCustomerRegistration>,
  TCustomerRegistration extends DaffCustomerRegistration,
  TLoginInfo extends DaffLoginInfo
> {
  transform(registration: TAccountRegistration): TLoginInfo
}
