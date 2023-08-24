import { DaffAuthInvalidAPIResponseError } from '@daffodil/auth/driver';
import { DaffError } from '@daffodil/core';
import { daffTransformMagentoError } from '@daffodil/driver/magento';

import { DaffAuthMagentoErrorMap } from './map';

export const transformMagentoAuthError = (error: any): DaffError =>
  daffTransformMagentoError(error, DaffAuthMagentoErrorMap)[0] || new DaffAuthInvalidAPIResponseError(error.message);
