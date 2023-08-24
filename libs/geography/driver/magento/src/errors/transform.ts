import { DaffError } from '@daffodil/core';
import { daffTransformMagentoError } from '@daffodil/driver/magento';
import { DaffGeographyInvalidAPIResponseError } from '@daffodil/geography/driver';

import { DaffGeographyMagentoErrorMap } from './map';

export function transformMagentoGeographyError(error: any): DaffError {
  return daffTransformMagentoError(error, DaffGeographyMagentoErrorMap)[0] || new DaffGeographyInvalidAPIResponseError(error.message);
}
