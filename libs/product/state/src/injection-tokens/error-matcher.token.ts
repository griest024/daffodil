import { InjectionToken } from '@angular/core';

import { daffTransformErrorToStateError } from '@daffodil/core/state';

/**
 * Transforms {@link DaffError}s into {@link DaffStateError}s before they are serialized into state.
 * Can be used to further refine Daffodil errors into more specific app errors.
 */
export const DAFF_PRODUCT_ERROR_MATCHER = new InjectionToken<typeof daffTransformErrorToStateError>(
  'DAFF_PRODUCT_ERROR_MATCHER',
  { factory: () => daffTransformErrorToStateError },
);