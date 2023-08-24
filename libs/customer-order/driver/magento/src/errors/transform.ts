import { DaffError } from '@daffodil/core';
import { DaffCustomerInvalidAPIResponseError } from '@daffodil/customer-order/driver';
import { daffTransformMagentoError } from '@daffodil/driver/magento';

export function transformMagentoReviewsError(error: any): DaffError {
  return daffTransformMagentoError(error, {})[0] || new DaffCustomerInvalidAPIResponseError(error.message);
}
