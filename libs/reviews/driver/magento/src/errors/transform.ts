import { DaffError } from '@daffodil/core';
import { daffTransformMagentoError } from '@daffodil/driver/magento';
import { DaffReviewsInvalidAPIResponseError } from '@daffodil/reviews/driver';

import { DaffReviewsMagentoErrorMap } from './map';

export function transformMagentoReviewsError(error: any): DaffError {
  return daffTransformMagentoError(error, DaffReviewsMagentoErrorMap)[0] || new DaffReviewsInvalidAPIResponseError(error.message);
}
