import { DaffError } from '@daffodil/core';
import { daffTransformMagentoError } from '@daffodil/driver/magento';
import { DaffOrderInvalidAPIResponseError } from '@daffodil/order/driver';

import { DaffOrderMagentoErrorMap } from './map';

export function transformMagentoOrderError(error: any): DaffError {
  return daffTransformMagentoError(error, DaffOrderMagentoErrorMap)[0] || new DaffOrderInvalidAPIResponseError(error.message);
}
