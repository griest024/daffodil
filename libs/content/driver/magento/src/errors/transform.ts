import { DaffError } from '@daffodil/core';
import { daffTransformMagentoError } from '@daffodil/driver/magento';

import { DaffContentMagentoErrorMap } from './map';

export function transformMagentoContentError(error: any): DaffError {
  return daffTransformMagentoError(error, DaffContentMagentoErrorMap)[0];
}
