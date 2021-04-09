import {
  DaffInheritableError,
  DaffError,
} from '@daffodil/core';

import { DaffCategoryErrorCodes } from '../../errors/codes.enum';

export class DaffCategoryFilterNotFound extends DaffInheritableError implements DaffError {
  public readonly code: string = DaffCategoryErrorCodes.CATEGORY_FILTER_NOT_FOUND;

  constructor(message?: string) {
	  super(message);
  }
}
